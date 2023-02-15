import React from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { ILayer, ILayerOptions } from "@layerhub-io/types"
import Locked from "~/components/Icons/Locked"
import Unlocked from "~/components/Icons/Unlocked"
import Eye from "~/components/Icons/Eye"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Delete from "~/components/Icons/Delete"
import { Button, KIND, SIZE } from "baseui/button"
import { StatefulInput } from "baseui/input"

interface LayerProps {
  object: ILayer & Partial<fabric.Object>
  clickHandler: (id: string) => void
  actions: {
    unlock: (id: string) => void
    lock: (id: string) => void
    update: (props: Partial<ILayerOptions>, id: string) => void
    remove: (id: string) => void
  }
}
const Layer = ({ object, clickHandler, actions }: LayerProps) => {
  const [editing, setEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
  }, [])

  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEditing(false)
    }
  }

  return (
    <Block
      $style={{
        display: "grid",
        gridTemplateColumns: "1fr 90px",
        fontSize: "14px",
        alignItems: "center",
        ":hover": {
          background: "rgb(245,246,247)",
        },
      }}
      key={object.id}
    >
      <Block
        $style={{ cursor: "pointer" }}
        onClick={() => clickHandler(object.id)}
        onDoubleClick={() => setEditing(true)}
      >
        {editing ? (
          <StatefulInput inputRef={inputRef} initialState={{ value: object.name }} />
        ) : (
          <Block>{object.name}</Block>
        )}
      </Block>
      <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        {object.locked ? (
          <Button
            kind={KIND.tertiary}
            size={SIZE.mini}
            onClick={() => actions.unlock(object.id)}
            overrides={{
              Root: {
                style: {
                  paddingLeft: "4px",
                  paddingRight: "4px",
                },
              },
            }}
          >
            <Locked size={24} />
          </Button>
        ) : (
          <Button
            kind={KIND.tertiary}
            size={SIZE.mini}
            onClick={() => actions.lock(object.id)}
            overrides={{
              Root: {
                style: {
                  paddingLeft: "4px",
                  paddingRight: "4px",
                },
              },
            }}
          >
            <Unlocked size={24} />
          </Button>
        )}

        {object.visible ? (
          <Button
            kind={KIND.tertiary}
            size={SIZE.mini}
            onClick={() => actions.update({ visible: false }, object.id)}
            overrides={{
              Root: {
                style: {
                  paddingLeft: "4px",
                  paddingRight: "4px",
                },
              },
            }}
          >
            <Eye size={24} />
          </Button>
        ) : (
          <Button
            kind={KIND.tertiary}
            size={SIZE.mini}
            onClick={() => actions.update({ visible: true }, object.id)}
            overrides={{
              Root: {
                style: {
                  paddingLeft: "4px",
                  paddingRight: "4px",
                },
              },
            }}
          >
            <EyeCrossed size={24} />
          </Button>
        )}
        <Button
          kind={KIND.tertiary}
          size={SIZE.mini}
          onClick={() => actions.remove(object.id)}
          overrides={{
            Root: {
              style: {
                paddingLeft: "4px",
                paddingRight: "4px",
              },
            },
          }}
        >
          <Delete size={24} />
        </Button>
      </Block>
    </Block>
  )
}

export default Layer

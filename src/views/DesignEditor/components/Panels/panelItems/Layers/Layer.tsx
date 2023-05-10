import React, { Dispatch, SetStateAction } from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import { StatefulInput } from "baseui/input"
import { useClickOutside, useMergedRef } from "@mantine/hooks"
import { Block } from "baseui/block"
import { ILayer, ILayerOptions } from "@layerhub-io/types"
import Locked from "~/components/Icons/Locked"
import Unlocked from "~/components/Icons/Unlocked"
import Eye from "~/components/Icons/Eye"
import EyeCrossed from "~/components/Icons/EyeCrossed"
import Delete from "~/components/Icons/Delete"
import { Button, KIND, SIZE } from "baseui/button"

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

const LayerNameInput = ({
  name,
  setEditing,
  onUpdate,
}: {
  name: string
  setEditing: Dispatch<SetStateAction<boolean>>
  onUpdate: (update: any) => void
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const handleClickOutside = () => {
    setEditing(false)
    if (inputRef.current) {
      onUpdate({ name: inputRef.current.value })
    }
  }

  useClickOutside(handleClickOutside, ["mousedown", "touchstart"], [inputRef.current as HTMLInputElement])
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setEditing(false)
      console.log({ e })
      onUpdate({ name: e.target.value })
    }
  }
  return <StatefulInput inputRef={inputRef} initialState={{ value: name }} onKeyDown={handleKeyDown} />
}

const Layer = ({ object, clickHandler, actions }: LayerProps) => {
  const [editing, setEditing] = React.useState(false)

  // const focusTrapRef = useFocusTrap()
  // const mergedRef = useMergedRef<HTMLInputElement>(inputRef, useClickOutsideRef)

  // React.useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, false)
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, false)
  //   }
  // }, [])

  // const handleClickOutside = (e: any) => {
  //   console.log({ e })
  //   setEditing(false)
  //   // if (inputRef.current && !inputRef.current.contains(e.target)) {
  //   //   setEditing(false)
  //   // }
  // }

  const handleUpdate = (update: any) => {
    actions.update({ ...update }, object.id)
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
          // <StatefulInput inputRef={inputRef} initialState={{ value: object.name }} onKeyDown={handleKeyDown} />
          <LayerNameInput setEditing={setEditing} name={object.name || ""} onUpdate={handleUpdate} />
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

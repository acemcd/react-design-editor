import React from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { ILayer } from "@layerhub-io/types"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Layer from "~/views/DesignEditor/components/Panels/panelItems/Layer"

const Layers = () => {
  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects)
    }
  }, [objects])

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects])
      }
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, objects])

  const clickHandler = (id: string) => {
    if (editor.state.activeObject.id !== id) {
      editor.objects.select(id)
    } else {
    }
  }

  const objActions = {
    unlock: editor.objects.unlock,
    lock: editor.objects.lock,
    update: editor.objects.update,
    remove: editor.objects.remove,
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Layers</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          {layerObjects.map((object) => (
            <Layer object={object} clickHandler={editor.objects.select} actions={objActions} />
          ))}
        </Block>
      </Scrollable>
    </Block>
  )
}

export default Layers

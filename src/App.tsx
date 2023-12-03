import Dragger from "./components/dragger/Dragger.tsx";
import {PictureOutlined} from "@ant-design/icons"
import {Button, Flex, Input, message, Popconfirm} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import UploadedList from "./components/uploaded-list/UploadedList.tsx";
import {useFetching} from "./hooks/useFetching.ts";
import {Service} from "./api/Service.ts";
export type clientUploadedCover = {
    url: string
    file: File
}
function App() {
    const [cover, setCover] = useState<clientUploadedCover|null>(null)
    const [text, setText] = useState('')
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [upload, isLoading, err] = useFetching(async () => {
        await Service.someApiFunction(text, cover?.file)
            .catch(console.error)
    })
    const removeFiles = (t:string) => {
        if (!t) return
        if (t === "cover") setCover(null)
    }
    const changeCover = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            setCover({file:event.target.files[0], url: URL.createObjectURL(event.target.files[0])})
        }
    }
    const showPopconfirm = () => {
        setConfirmOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        upload().catch(console.error)
    };
    const handleCancel = () => {
        setConfirmOpen(false);
    };
    useEffect(() => {
        // @ts-ignore
        window.Telegram.WebApp.expand();
        // @ts-ignore
        window.Telegram.WebApp.enableClosingConfirmation();
    }, []);
    useEffect(() => {
        if (err) return
        if (!isLoading && cover && text) {
            message.success("Даные были отправлены").then(() => {
                setCover(null)
                setText("")
                setConfirmLoading(false)
                setConfirmOpen(false)
            })
        }

    }, [isLoading, err]);
  return (
    <>
      <div className="min-w-max flex justify-center align-middle" style={{minWidth: '100vw', display: "flex", justifyContent: 'center', minHeight: "100vh", alignContent: "center"}}>
          <Flex vertical style={{minWidth: "80%", paddingTop: "2em"}} gap={32}>
              {err && <span style={{color: "red"}}>{err}</span>}
              <div>
                  <Dragger fileType={"image/*"} onChange={changeCover}>
                      {cover? <div className="absolute top-0 left-0"><img src={cover.url} alt="обложка" style={{width: "100%", height: "100%", objectFit: "contain", zIndex: 1}}/></div>
                          : <div>
                              <p className="upload-drag-icon">
                              <PictureOutlined />
                              </p>
                              <p className="upload-text">Загрузите картинку</p>
                              <p className="upload-hint">
                                  Поддерживаются любые типы изображений
                              </p>
                          </div>
                      }
                  </Dragger>
                  {/*@ts-ignore*/}
                  <UploadedList files={[cover]} onRemove={removeFiles} type="cover"/>
              </div>
              <Input placeholder={"какой-то текст"} onChange={e => setText(e.target.value)}/>
              <Popconfirm title={"Сохранение данных"} description={"Добавить данные на сервер"} open={confirmOpen} onConfirm={handleOk} okButtonProps={{ loading: confirmLoading }} onCancel={handleCancel}>
                  <Button type={"primary"} disabled={!cover || !text.length} onClick={showPopconfirm}>
                      Сохранить
                  </Button>
              </Popconfirm>
          </Flex>
      </div>
    </>
  )
}

export default App

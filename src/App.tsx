import Dragger from "./components/dragger/Dragger.tsx";

function App() {

  return (
    <>
      <div className="min-w-max flex justify-center align-middle">
          <div className="flex-col">
              <Dragger fileType={"image/*"}>
                  <p className="upload-text">Загрузите обложку</p>
                  <p className="upload-hint">
                      При загрузке аудио, попытаемся извлечь обложку из метаданных
                  </p>
              </Dragger>
          </div>
      </div>
    </>
  )
}

export default App

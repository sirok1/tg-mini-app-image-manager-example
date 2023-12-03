import React, {ChangeEventHandler} from "react";

export default function Dragger({children, fileType, onChange}:{children:React.ReactNode, fileType:string, onChange?:ChangeEventHandler<HTMLInputElement>}) {
    return(
        <span className="upload-wrapper">
                <div className="upload upload-drag">
                    <span className="upload upload-btn">
                        <input type="file" accept={fileType} onChange={onChange}/>
                        <div className="upload-drag-container">
                            {children}
                        </div>
                    </span>
                </div>
            </span>
    )
}
import "./Directories.css";
import Axios from 'axios';
import define from "../../define/define";
import React, { useState, useEffect, useRef } from "react";

const Directory = ({ index, selectedID, directory, setDirectoryID, updateDirectories, setUpdateDirectories, updateUrls, setUpdateUrls, isDragging, setisDragging
    , setCount, setUrls, urls }) => {
    const [directoryName, setdirectoryName] = useState(directory.name)
    const [isEditingDirectoryName, setisEditingDirectoryName] = useState(false)
    const [isDragEnter, setisDragEnter] = useState(false)

    // useRef는 리엑트에서 this를 대체한다. jsx 태그에 ref={}로 참조할 변수를 입력 후, 코드에서 참조한다.
    const inputDirectoryNameRef = useRef(null)

    useEffect(() => {
        if (isEditingDirectoryName) {
            // 클래스를 가진 첫 번째 요소가 focus 돼서 취소
            // document.querySelector(".input-directory-name").focus()
            inputDirectoryNameRef.current.select()
        }
    }, [isEditingDirectoryName]);


    const inputDirectoryNameClick = e => {
        // 이벤트 전파 막기위해
        e.stopPropagation()
        // event 일 시, this 대신 e.target을 사용하자
        e.target.select()
        // document.querySelector(".input-directory-name").select()
    }
    const inputDirectoryKeyUp = e => {
        e.preventDefault()
        // console.log(e.key)
        switch (e.key) {
            case "Escape":
                cancelEditDirectoryName(e)
                break;
            case "Enter":
                submitPutDirectoryName()
                break;
            default:
                break;
        }
        if (e.target.value.length > 20) {
            alert("Enter the folder name within 20 characters.")
            e.target.value = e.target.value.slice(0, 20)
        }
    }
    const submitPutDirectoryName = () => {
        const updatedDirectoryName = inputDirectoryNameRef.current.value
        // 유효성, 글자 제한 확인 !
        if (!updatedDirectoryName || updatedDirectoryName.length < 1) {
            alert("Enter the folder name.")
            return
        }
        // 글자 제한 확인
        if (updatedDirectoryName.length > 20) {
            alert("Enter the folder name within 20 characters.")
            return
        }
        // 이름 같으면 return
        if (directoryName === updatedDirectoryName) {
            setisEditingDirectoryName(false)
            return
        }
        if (window.confirm(`Do you want to change [${directoryName}] to [${updatedDirectoryName}]`) === false) {
            return
        }
        Axios.put(`${define.URL}/directories`, {
            directoryID: directory.directory_id,
            directoryName: updatedDirectoryName
        }).then((response) => {
            if (response.status !== 200) {
                alert("oops, error. status: ", response.status);
                return
            }
            setisEditingDirectoryName(false)
            setdirectoryName(updatedDirectoryName)
        }).catch((err) => {
            if (err) {
                // console.log(err)
                alert("oops, error");
                return
            }
        });
    }
    // 포커스 아웃
    // const inputDirectoryNameFocusOut = e => {
    //     return
    //     e.preventDefault()
    //     if (isEditingDirectoryName) {
    //         setisEditingDirectoryName(false)
    //     }
    // }
    const deleteDirectory = (e) => {
        e.preventDefault()
        // 부모의 이벤트 실행을 막아준다.
        e.stopPropagation()
        e.currentTarget.blur()
        const directoryID = directory.directory_id
        if (directory.directory_after === 0) {
            alert("Default folders cannot be deleted.")
            return
        }
        if (window.confirm("All bookmarks in this folder will be deleted. Are you sure you want to delete?") == false) {
            return;
        }
        Axios.delete(`${define.URL}/directories/${directoryID}`
        ).then((response) => {
            switch (response.status) {
                case 200:
                    setUpdateDirectories(!updateDirectories)
                    if (directoryID == selectedID) {
                        setUpdateUrls(val => !val)
                    }
                    alert(`delete!`)
                    break;
                case 403:
                    alert("Default folders cannot be deleted.")
                    return
                default:
                    alert("oops, error");
                    return
            }
        }).catch((err) => {
            if (err) {
                // console.log(err)
                alert("oops, error");
                return
            }
        });
    }
    const selectDirectoryID = (e) => {
        e.preventDefault()
        setDirectoryID(directory.directory_id)
        setUpdateUrls(val => !val)
    }
    const cancelEditDirectoryName = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.blur()
        setisEditingDirectoryName(false)
    }
    const checkEditDirectoryName = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.blur()
        submitPutDirectoryName()
    }
    const editDirectoryName = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.blur()
        // 현재 dir를 지정
        // setdirectoryName(directory.name)
        if (isEditingDirectoryName) {
            return
        }
        setisEditingDirectoryName(true)

        // Axios.post(`${define.URL}/directories`, {
        //     directoryName: `dir${directoryCount}`
        // }).then((response) => {
        //     if (response.status !== 200) {
        //         alert("oops, error");
        //         return
        //     }
        // })
    };
    const allowUrlDragDrop = (e) => {
        e.preventDefault()
    }
    const urlDrop = (e) => {
        e.preventDefault()
        // 현재 dir 일 때
        // alert(typeof directory.directory_id, directory.directory_id)
        // alert(typeof selectedID, selectedID)
        const dataUrlID = e.dataTransfer.getData("urlID")
        // dir끼리 drop할 때, return
        if (!dataUrlID) {
            setisDragEnter(false)
            return
        }
        if (directory.directory_id === Number(selectedID)) {
            alert("Same folder.")
            setisDragEnter(false)
            return
        }

        Axios.put(`${define.URL}/urls/directory`, {
            urlID: dataUrlID,
            directoryID: directory.directory_id,
        }).then((response) => {
            if (response.status !== 200) {
                alert("oops, error. status: ", response.status);
                return
            }
            setUrls(urls.filter((val) => {
                return val.url_id !== Number(dataUrlID)
            }))
            setCount(val => val - 1)
            setisEditingDirectoryName(false)
        }).catch((err) => {
            if (err) {
                // console.log(err)
                alert("oops, error");
                return
            }
        });
        setisDragEnter(false)
    }
    const urlDragEnter = (e) => {
        e.stopPropagation()
        e.preventDefault()
        // 현재 dir 일 때
        if (directory.directory_id === selectedID) {
            return
        }
        setisDragEnter(true)
    }
    const urlDragLeave = (e) => {
        e.preventDefault()
        setisDragEnter(false)
        return
    }
    return (
        <div className="div-directory-wrapper">
            <span className={`span-directory-index ${directory.directory_id == selectedID
                ? "span-directory-index-selected" : ""}`}>
                {index + 1}
            </span>
            <div className={
                `${directory.directory_id == selectedID
                    ? "div-directory-selected" : ""} ${isDragEnter ? "div-directory-dragEnter" : ""} div-directory`
            }
                onClick={selectDirectoryID}
                onDragOver={allowUrlDragDrop}
                onDrop={urlDrop}
                onDragEnter={urlDragEnter}
                onDragLeave={urlDragLeave}
            >
                <div className="div-directory-name">
                    {isEditingDirectoryName
                        ? (
                            <input className="input-directory-name"
                                ref={inputDirectoryNameRef}
                                onClick={inputDirectoryNameClick}
                                defaultValue={directoryName}
                                onKeyUp={inputDirectoryKeyUp}
                            >
                                {/*onBlur={inputDirectoryNameFocusOut}>*/}
                            </input>
                        ) :
                        (
                            <p className="p-directory-name">
                                {directoryName}
                            </p>
                        )}
                    {/* <p className="p-directory-name">
                    {directory.name}
                </p> */}
                </div>
                <div className="div-directory-edit-btn-wrapper">
                    {isEditingDirectoryName
                        ?
                        (
                            <div className="div-directory-check-btn">
                                <button onClick={checkEditDirectoryName} className="directory-check-btn">
                                    <i className="fa fa-check"></i>
                                </button>
                                <button onClick={cancelEditDirectoryName} className="directory-cancel-btn">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            // null
                        )
                        :
                        (
                            <button onClick={editDirectoryName} className="directory-edit-btn">
                                <i className="fas fa-edit"></i>
                            </button>
                        )
                    }
                    <button onClick={deleteDirectory} className="directory-delete-btn directory-edit-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div >
        </div>
    );
};

export default Directory;
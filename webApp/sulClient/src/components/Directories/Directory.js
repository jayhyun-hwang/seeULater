import "./Directories.css";
import Axios from 'axios';
import define from "../../define/define";
import React, { useState, useEffect, useRef } from "react";

const Directory = ({ index, selectedID, directory, setDirectoryID, updateDirectories, setUpdateDirectories, updateUrls, setUpdateUrls }) => {
    const [directoryName, setdirectoryName] = useState(directory.name)
    const [isEditingDirectoryName, setisEditingDirectoryName] = useState(false)
    // useRef는 리엑트에서 this를 대체한다. jsx 태그에 ref={}로 참조할 변수를 입력 후, 코드에서 참조한다.
    const inputDirectoryNameRef = useRef(null)
    const btnEditRef = useRef(null)

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
        console.log(e.key)
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
            alert("Please enter a folder name within 20 characters.")
            e.target.value = e.target.value.slice(0, 20)
        }
    }
    const submitPutDirectoryName = () => {
        console.log(inputDirectoryNameRef.current.value)
        const updatedDirectoryName = inputDirectoryNameRef.current.value
        Axios.put(`${define.URL}/directories`, {
            directoryID: directory.id,
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
                console.log(err)
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
        if (window.confirm("All bookmarks in this folder will be deleted. Are you sure you want to delete?") == false) {
            return;
        }
        Axios.delete(`${define.URL}/directories/${directory.id}`
        ).then((response) => {
            console.log("에러확인", response.status)
            if (response.status !== 200) {
                alert("oops, error");
                return
            }
            setUpdateDirectories(!updateDirectories)
            // setUpdateUrls(!updateUrls)
        }).catch((err) => {
            if (err) {
                console.log(err)
                alert("oops, error");
                return
            }
        });
    }
    const selectDirectoryID = (e) => {
        e.preventDefault()
        setDirectoryID(directory.id)
        setUpdateUrls(val => !val)
    }
    const cancelEditDirectoryName = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setisEditingDirectoryName(false)
    }
    const editDirectoryName = (e) => {
        e.preventDefault()
        e.stopPropagation()
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
        alert(e.dataTransfer.getData("urlID"))
    }
    const urlDragEnter = (e) => {
        e.preventDefault()
        console.log(e.target.className)
        console.log(e.target.classList)
        e.target.classList.add("div-directory-dragEnter")
        e.stopPropagation()
    }
    const urlDragLeave = (e) => {
        e.preventDefault()
        console.log(e.target.className)
        if (e.target.className != "div-directory") {
            console.log("!!!!!!!!!!")
        }
        e.target.classList.remove("div-directory-dragEnter")
        return
    }
    return (
        <div className={
            `${directory.id == selectedID
                ? "div-directory-selected" : ""} div-directory `
        } onClick={selectDirectoryID} onDragOver={allowUrlDragDrop} onDrop={urlDrop} onDragEnter={urlDragEnter} onDragLeave={urlDragLeave}>
            <div className="div-directory-name">
                {isEditingDirectoryName
                    ? (<div className="div-input-directory-name">
                        <input className="input-directory-name"
                            ref={inputDirectoryNameRef}
                            onClick={inputDirectoryNameClick}
                            defaultValue={directoryName}
                            onKeyUp={inputDirectoryKeyUp}
                        >
                            {/*onBlur={inputDirectoryNameFocusOut}>*/}
                        </input>
                        <button onClick={cancelEditDirectoryName} className="directory-cancel-btn">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
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
                        <button onClick={cancelEditDirectoryName} className="directory-cancel-btn">
                            <i className="fa fa-times"></i>
                        </button>
                        // null
                    )
                    :
                    (
                        <button onClick={editDirectoryName} className="directory-edit-btn"
                            ref={btnEditRef}>
                            <i className="fas fa-edit"></i>
                        </button>
                    )
                }
                <button onClick={deleteDirectory} className="directory-delete-btn directory-edit-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div >
    );
};

export default Directory;
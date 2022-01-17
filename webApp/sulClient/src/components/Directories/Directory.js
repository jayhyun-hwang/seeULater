import "./Directories.css";
import Axios from 'axios';
import define from "../../define/define";

const Directory = ({ index, selectedID, directory, setDirectoryID, updateDirectories, setUpdateDirectories, updateUrls, setUpdateUrls }) => {
    const deleteDirectory = (e) => {
        e.preventDefault()
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
    const selectDirectoryID = () => {
        setDirectoryID(directory.id)
        // console.log(updateUrls)
        setUpdateUrls(val => !val)
        // setUpdateUrls(!updateUrls)
        setTimeout(() => {
            // console.log(updateUrls)
        }, 1000);
    }
    const editDirectoryName = (e) => {
        e.preventDefault()
        return (
            <input>
            </input>
        )
        // Axios.post(`${define.URL}/directories`, {
        //     directoryName: `dir${directoryCount}`
        // }).then((response) => {
        //     if (response.status !== 200) {
        //         alert("oops, error");
        //         return
        //     }
        // })
    };
    return (
        <div className={
            `${directory.id == selectedID
                ? "div-directory-selected" : ""} div-directory `
        } onClick={selectDirectoryID}>
            <div className="div-directory-name">
                <p className="p-directory-name">
                    {directory.name}
                </p>
            </div>
            <div className="div-directory-edit-btn-wrapper">
                <button onClick={editDirectoryName} className="directory-edit-btn">
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={deleteDirectory} className="directory-delete-btn directory-edit-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default Directory;
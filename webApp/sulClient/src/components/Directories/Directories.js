import "./Directories.css";
import Directory from "src/components/Directories/Directory";
import Axios from 'axios';
import define from "../../define/define";
const Directories = ({ directoryList, directoryID, setDirectoryID, updateDirectories, setUpdateDirectories, updateUrls, setUpdateUrls
    , setCount, setUrls, urls }) => {
    const directoryCount = directoryList ? directoryList.length : 0

    const createFolderHandler = (e) => {
        e.preventDefault();
        if (directoryCount >= 10) {
            alert("Cannot create more than 10 folders.")
            return
        }
        Axios.post(`${define.URL}/directories`, {
            directoryName: `dir${directoryCount}`
        }).then((response) => {
            if (response.status !== 200) {
                alert("oops, error");
                return
            }
            setUpdateDirectories(!updateDirectories)
        })
    };
    return (
        <div className="div-directories-wrapper">
            <div className="div-directories">
                <p className="p-directoryCount">
                    {directoryCount} Folder{directoryCount > 1 ? "s" : null}
                </p>
                {directoryList.map((directory, index) => (
                    <Directory key={directory.directory_id}
                        index={index}
                        selectedID={directoryID}
                        directory={directory}
                        setDirectoryID={setDirectoryID}
                        updateDirectories={updateDirectories}
                        setUpdateDirectories={setUpdateDirectories}
                        updateUrls={updateUrls}
                        setUpdateUrls={setUpdateUrls}
                        setCount={setCount}
                        setUrls={setUrls}
                        urls={urls}
                    />
                ))}
                <div className="div-directory-plus-btn-wrapper">
                    <button onClick={createFolderHandler} className="directory-plus-btn">
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Directories;
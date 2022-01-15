import "./Directories.css";

const Directory = ({ key, index, directoryList, selectedID, directory, setDirectoryList, setDirectoryID }) => {
    const directoryCount = directoryList ? directoryList.length : 0
    console.log(key)
    console.log(selectedID)
    return (
        <div className={`div-directory${directory.id == selectedID ? "-selected" : ""}`}>
            {directory.name}
        </div>

    );
};

export default Directory;
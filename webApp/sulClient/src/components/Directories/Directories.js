import "./Directories.css";
import Directory from "src/components/Directories/Directory";

const Directories = ({ directoryList, setDirectoryList, directoryID, setDirectoryID }) => {
    const directoryCount = directoryList ? directoryList.length : 0

    return (
        <div className="div-directories">
            <p className="p-directoryCount">
            {directoryCount} Folder{directoryCount > 1 ? "s" : null}
            </p>
            {directoryList.map((directory, index) => (
                <Directory key = {directory.id}
                    index = {index}
                    selectedID = {directoryID}
                    directory = {directory}
                    setDirectoryList = {setDirectoryList}
                    setDirectoryID = {setDirectoryID}
                />
            ))}
        </div>

    );
};

export default Directories;
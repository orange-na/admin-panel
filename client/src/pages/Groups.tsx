import axios from "axios";

function Groups() {
  const handleCreateGroup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/addgroup",
        { groupname: "new" },
        { withCredentials: true }
      );
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div>
          <button
            onClick={handleCreateGroup}
            className="px-[10px] py-[5px] bg-gray-700 rounded-md text-white"
          >
            Create Group
          </button>
        </div>
      </div>
    </>
  );
}

export default Groups;

import axios from "axios";
import { useEffect, useState } from "react";

interface Update {}

function Groups() {
  const [inputs, setInputs] = useState({
    groupname: "",
    hostname: "",
  });
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState<Update[]>([]);

  const handleCreateGroup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/addgroup",
        inputs,
        { withCredentials: true }
      );
      const data = await res.data;
      setUpdate((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users/me/groups", {
        withCredentials: true,
      });
      const data = res.data;
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getGroups();
  }, [update]);

  console.log(groups);

  return (
    <>
      <div className="flex flex-col w-full mt-[40px] mx-[30px]">
        <div className="flex justify-center mb-[20px]">
          <div className="flex gap-[10px]">
            <input
              name="groupname"
              className="px-[15px] py-[10px] border-b border-gray-300 rounded-md w-[300px]"
              type="text"
              onChange={handleChanged}
              placeholder="Group Name"
              // value={}
            />
            <button
              onClick={handleCreateGroup}
              className="px-[15px] py-[10px] bg-gray-700 rounded-md text-white"
            >
              Add New Group
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between px-[15px] py-[20px] shadow-md rounded-md mt-[20px] bg-slate-200 mr-[20px]">
            <div>#</div>
            <div>Group Name</div>
            <div>Host Name</div>
            <div>Password</div>
            <div>Contact</div>
            <div>Address</div>
            <div>Edit Delete</div>
          </div>
          {groups.map((group, index) => {
            return (
              <div
                key={index}
                className="flex justify-between px-[15px] py-[20px] rounded-md mt-[10px] mr-[20px]"
              >
                <div>{index + 1}</div>
                <div>{group?.groupname}</div>
                <div>{group?.username}</div>
                <div>Password</div>
                <div>Contact</div>
                <div>Address</div>
                <div>Edit Delete</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Groups;

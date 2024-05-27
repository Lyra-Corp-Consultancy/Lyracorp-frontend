/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { createdModules } from "../../../utils/values/publicValues";
import styles from "./Permission.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getType, getUser, userPermission } from "../../../utils/redux/actions";

function Permission() {
  const [givedPermissions, setPermissions] = useState<{ view: any[]; edit: any[]; delete: any[]; add: any[] }>({ view: [], edit: [], delete: [], add: [] });
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [allModules, setAllModules] = useState<any>();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<any[]>([]);
  const [role, setRole] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const params: any = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    dispatch(userPermission({ data: givedPermissions, id: params.id })).then(()=>{
      navigate(-1)
    })
  };

  const dispatch: any = useDispatch();
  const getAllChildrens = (val: any[], i: number = 0) => {
    let datas: string[] = [val?.[0]];
    if (val?.[1]?.length > 0) {
      for (let j = 0; j < val[1]?.length; j++) {
        datas = [...getAllChildrens(val[1][j], i + 1), ...datas];
      }
    }
    return datas;
  };

  const getAllChildrensWithExpandIndex = (val: any[], i: number = 0, k: number = 0, index: number = 0, pi: number = 0) => {
    let datas: any = [{ val: val?.[0], index: k + index, parentIndex: pi }];
    if (val?.[1]?.length > 0) {
      for (let j = 0; j < val[1]?.length; j++) {
        datas = [...getAllChildrensWithExpandIndex(val[1][j], i + 1, k + 20, j, k + index), ...datas];
      }
    }
    return datas;
  };

  useEffect(() => {
    const data: string[] = [];
    for (let i = 0; i < createdModules.length; i++) {
      data.push(...getAllChildrensWithExpandIndex(createdModules[i], 0, 0, i));
    }
    setAllModules(data);
    dispatch(getUser(params.id)).then((res: any) => {
      setUser(res.payload);
      setPermissions(res.payload.permissions)
    });
    dispatch(getType("department")).then((res: any) => {
      setDepartment(res?.payload[0]?.departmentType);
      console.log(res?.payload[0]?.departmentType);
    });
    dispatch(getType("role")).then((res: any) => {
      setRole(res?.payload[0]?.roleType);
      console.log(res?.payload[0]?.departmentType);
    });
  }, []);

  const getChildrensByPath = (path: string[], i: number = 0, val: any[] = createdModules) => {
    const data = val[val.map((x) => x?.[0]).indexOf(path[i])];
    let returnValue = [getAllChildrens(data).filter((x) => x !== data?.[0])];
    if (data?.[1]?.length) {
      if (path[i + 1]) {
        returnValue = [...returnValue, ...getChildrensByPath(path, i + 1, data[1])];
      }
    }
    console.log(returnValue);
    return returnValue;
  };
  const PermissionTable = ({ modules = createdModules, k = 0, path = [] }: { modules?: any[]; k?: number; path?: string[] }) => {
    const handleModuleClick = (index: number) => {
      console.log(index);
      if (expandedModules.includes(index)) {
        setExpandedModules(expandedModules.filter((item) => item !== index));
      } else {
        setExpandedModules([...expandedModules, index]);
      }
    };

    useEffect(() => {
      const elem = document.getElementById(search?.split(" ").join("-"));
      // setSearch("")
      console.log(elem);
      let timeout: NodeJS.Timeout;
      if (elem) {
        elem.style.background = "#c2caff";
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
        timeout = setTimeout(() => {
          elem.style.background = "white";
        }, 1500);
      }
      return () => clearTimeout(timeout);
    }, [expandedModules]);

    const allCheckBox = async (module: any, e: any) => {
      const temp = getAllChildrens(module);
      if (e.target.checked) {
        const data = getChildrensByPath(path);
        const updation = { edit: [...givedPermissions.edit, ...temp], view: [...givedPermissions.view, ...temp], delete: [...givedPermissions.delete, ...temp], add: [...givedPermissions.add, ...temp] };
        for (let i = data.length - 1; i >= 0; i--) {
          const x = data?.[i];
          if (x.every((child) => updation.add.includes(child))) {
            updation.add = [...updation.add, path?.[i]];
          }
          if (x.every((child) => updation.delete.includes(child))) {
            updation.add = [...updation.delete, path?.[i]];
          }
          if (x.every((child) => updation.edit.includes(child))) {
            updation.add = [...updation.edit, path?.[i]];
          }
          if (x.every((child) => updation.view.includes(child))) {
            updation.add = [...updation.view, path?.[i]];
          }
        }
        setPermissions({ ...updation });
      } else {
        setPermissions({
          ...givedPermissions,
          edit: givedPermissions?.edit.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
          add: givedPermissions?.add.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
          delete: givedPermissions?.delete.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
          view: givedPermissions?.view.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
        });
      }
    };

    const editCheckBox = (module: any, e: any) => {
      const temp = getAllChildrens(module);
      if (e.target.checked) {
        const data = getChildrensByPath(path);
        let updation: any = [...givedPermissions.edit, ...temp];
        for (let i = data.length - 1; i >= 0; i--) {
          const x = data?.[i];
          if (x.every((child) => updation.includes(child))) {
            updation = [...updation, path?.[i]];
          }
        }
        setPermissions({ ...givedPermissions, edit: updation });
      } else {
        setPermissions({
          ...givedPermissions,
          edit: givedPermissions?.edit.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
        });
      }
    };

    const addCheckBox = (module: any, e: any) => {
      const temp = getAllChildrens(module);
      if (e.target.checked) {
        const data = getChildrensByPath(path);
        let updation: any = [...givedPermissions.add, ...temp];
        for (let i = data.length - 1; i >= 0; i--) {
          const x = data?.[i];
          if (x.every((child) => updation.includes(child))) {
            updation = [...updation, path?.[i]];
          }
        }
        setPermissions({ ...givedPermissions, add: updation });
      } else {
        setPermissions({
          ...givedPermissions,
          add: givedPermissions?.add.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
        });
      }
    };

    const viewCheckBox = (module: any, e: any) => {
      const temp = getAllChildrens(module);
      if (e.target.checked) {
        const data = getChildrensByPath(path);
        let updation: any = [...givedPermissions.view, ...temp];
        for (let i = data.length - 1; i >= 0; i--) {
          const x = data?.[i];
          if (x.every((child) => updation.includes(child))) {
            updation = [...updation, path?.[i]];
          }
        }
        setPermissions({ ...givedPermissions, view: updation });
      } else {
        setPermissions({
          ...givedPermissions,
          view: givedPermissions?.view.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
        });
      }
    };

    const deleteCheckBox = (module: any, e: any) => {
      const temp = getAllChildrens(module);
      if (e.target.checked) {
        const data = getChildrensByPath(path);
        let updation: any = [...givedPermissions.delete, ...temp];
        for (let i = data.length - 1; i >= 0; i--) {
          const x = data?.[i];
          if (x.every((child) => updation.includes(child))) {
            updation = [...updation, path?.[i]];
          }
        }
        setPermissions({ ...givedPermissions, delete: updation });
      } else {
        setPermissions({
          ...givedPermissions,
          delete: givedPermissions?.delete.filter((x) => {
            return ![...temp, ...path].includes(x);
          }),
        });
      }
    };

    const renderModules = (modules: any[], prefix: number) => {
      return modules.map((module, index) => (
        <React.Fragment key={index}>
          <tr id={module[0]?.split(" ").join("-")} className="border transition-all duration-1000 bg-white">
            <td>
              <input type="checkbox" checked={givedPermissions?.view.includes(module[0]) && givedPermissions?.add.includes(module[0]) && givedPermissions?.delete.includes(module[0]) && givedPermissions?.edit.includes(module[0]) ? true : false} onChange={(e) => allCheckBox(module, e)} />
            </td>
            <td className={"text-start flex " + (module[1] && "text-[#5970F5] underline")} style={{ paddingLeft: k + "px", cursor: module[1] && "pointer" }} onClick={() => handleModuleClick(prefix + index)}>
              {module[0]}
            </td>
            <td className=" text-center">
              <input
                type="checkbox"
                checked={givedPermissions?.view.includes(module[0]) ? true : false}
                onChange={(e) => {
                  viewCheckBox(module, e);
                }}
              />
            </td>
            <td className=" text-center">
              <input
                type="checkbox"
                checked={givedPermissions?.add.includes(module[0]) ? true : false}
                onChange={(e) => {
                  addCheckBox(module, e);
                }}
              />
            </td>
            <td className=" text-center">
              <input
                type="checkbox"
                checked={givedPermissions?.edit.includes(module[0]) ? true : false}
                onChange={(e) => {
                  editCheckBox(module, e);
                }}
              />
            </td>
            <td className=" text-center">
              <input
                type="checkbox"
                checked={givedPermissions?.delete.includes(module[0]) ? true : false}
                onChange={(e) => {
                  deleteCheckBox(module, e);
                }}
              />
            </td>
          </tr>
          {expandedModules.includes(prefix + index) && module[1]?.length > 0 && <PermissionTable modules={module[1]} path={[...path, module[0]]} k={k + 20} />}
        </React.Fragment>
      ));
    };

    return <>{renderModules(modules, k)}</>;
  };

  return (
    <div className="h-[110vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">User Management</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full pt-3 h-[90%]  shadow-md mt-4">
            <h1 className="text-xl roboto-bold ps-2">Manage Permission</h1>
            <div className="grid grid-cols-4 gap-3 px-2 py-4">
              <label className="flex gap-2">
                Department
                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{department?.filter((x) => x?._id === user?.department)[0]?.value}</div>
              </label>
              <label className="flex gap-2">
                Role
                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{role?.filter((x) => x?._id === user?.role)[0]?.value?.value}</div>
              </label>
              <label className="flex gap-2">
                Username
                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] truncate min-w-[200px] rounded-md">{user?.username}</div>
              </label>
            </div>
            <label className="flex gap-3 relative w-[50%] items-center ms-2 mb-2 rounded-md px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.625 10.625L13.125 13.125M1.875 6.875C1.875 8.20108 2.40178 9.47285 3.33947 10.4105C4.27715 11.3482 5.54892 11.875 6.875 11.875C8.20108 11.875 9.47285 11.3482 10.4105 10.4105C11.3482 9.47285 11.875 8.20108 11.875 6.875C11.875 5.54892 11.3482 4.27715 10.4105 3.33947C9.47285 2.40178 8.20108 1.875 6.875 1.875C5.54892 1.875 4.27715 2.40178 3.33947 3.33947C2.40178 4.27715 1.875 5.54892 1.875 6.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input id="search" onChange={(e) => setSearch(e.target.value)} placeholder="search" type="search" className={"w-full px-3 outline-none border-none " + styles.inputBox} />
              <ul className={"absolute z-20  max-h-[150px] overflow-auto hidden left-0 bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.385)]  w-full bottom-0 translate-y-[100%]  " + styles.dropDown}>
                {allModules
                  ?.filter((x: any) => x?.val?.toLowerCase()?.includes(search.toLowerCase()))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        const opens = [];
                        let temp = x;
                        console.log(x, allModules);
                        while (temp?.parentIndex >= 20) {
                          opens.push(temp.parentIndex);
                          temp = allModules.filter((x: any) => x?.index === temp?.parentIndex)[0];
                        }
                        opens.push(temp.parentIndex);
                        setExpandedModules(opens);
                        setSearch(x?.val);
                      }}
                      className="hover:bg-[#00000032] px-2"
                    >
                      {x?.val}
                    </li>
                  ))}
              </ul>
            </label>
            <div className="overflow-auto h-[65%]">
              <table className="w-full ">
                <thead className="bg-[#5970F5] text-white ">
                  <tr>
                    <th rowSpan={2}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={createdModules?.map((x) => x[0]).every((child) => givedPermissions?.add?.includes(child)) && createdModules?.map((x) => x[0]).every((child) => givedPermissions?.delete.includes(child)) && createdModules.map((x) => x[0]).every((child) => givedPermissions?.edit.includes(child)) && createdModules.map((x) => x[0]).every((child) => givedPermissions?.view.includes(child)) ? true : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const data: string[] = [];
                            for (let i = 0; i < createdModules.length; i++) {
                              data.push(...getAllChildrens(createdModules[i]));
                            }
                            setPermissions({ ...givedPermissions, view: data, add: data, delete: data, edit: data });
                          } else {
                            setPermissions({ ...givedPermissions, view: [], add: [], delete: [], edit: [] });
                          }
                        }}
                      />
                    </th>
                    <th rowSpan={2} className="text-start">
                      Module
                    </th>
                    <th colSpan={4} className="text-center ">
                      Actions
                    </th>
                  </tr>

                  <tr>
                    <th className="text-center ">View</th>
                    <th className="text-center ">Add</th>
                    <th className="text-center ">Edit</th>
                    <th className="text-center ">Delete</th>
                  </tr>
                </thead>
                <tbody className="capitalize">
                  <PermissionTable />
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button className=" border rounded-md border-[#5970F5] text-[#5970F5] px-2 py-2" onClick={() => navigate(-1)}>
                Back to User list
              </button>
              <button className=" rounded-md bg-[#5970F5] text-white px-4 py-2" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;

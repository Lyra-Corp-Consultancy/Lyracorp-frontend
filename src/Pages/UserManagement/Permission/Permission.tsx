/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createdModules } from "../../../utils/values/publicValues";

function Permission() {
  const [givedPermissions, setPermissions] = useState<{ view: any[]; edit: any[]; delete: any[]; add: any[] }>({ view: [], edit: [], delete: [], add: [] });
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  console.log(givedPermissions);

  const PermissionTable = ({ modules = createdModules, k = 0, parent }: { modules?: any[]; k?: number; parent: any[] }) => {
    const handleModuleClick = (index: number) => {
      if (expandedModules.includes(index)) {
        setExpandedModules(expandedModules.filter((item) => item !== index));
      } else {
        setExpandedModules([...expandedModules, index]);
      }
    };

    const allCheckBox = async (module: any, e: any) => {
        const children: string[] = [];
        module[1]?.forEach((child: string) => {
          children.push(child[0]);
        });
      
        const updatedPermissions = { ...givedPermissions };
      
        if (e.target.checked) {
          updatedPermissions.edit = [...updatedPermissions.edit, module[0], ...children];
          updatedPermissions.add = [...updatedPermissions.add, module[0], ...children];
          updatedPermissions.view = [...updatedPermissions.view, module[0], ...children];
          updatedPermissions.delete = [...updatedPermissions.delete, module[0], ...children];
        } else {
          updatedPermissions.edit = updatedPermissions.edit.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
          updatedPermissions.add = updatedPermissions.add.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
          updatedPermissions.view = updatedPermissions.view.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
          updatedPermissions.delete = updatedPermissions.delete.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
        }
      
        if (parent && parent.length > 0 && parent[1]?.length > 0) {
          const parentChild: string[] = parent[1]?.map((x: string) => x[0]);
          if (parentChild.every((child: string) => updatedPermissions.edit.includes(child))) {
            updatedPermissions.edit.push(parent[0]);
          }
          if (parentChild.every((child: string) => updatedPermissions.add.includes(child))) {
            updatedPermissions.add.push(parent[0]);
          }
          if (parentChild.every((child: string) => updatedPermissions.view.includes(child))) {
            updatedPermissions.view.push(parent[0]);
          }
          if (parentChild.every((child: string) => updatedPermissions.delete.includes(child))) {
            updatedPermissions.delete.push(parent[0]);
          }
        }
      
        setPermissions(updatedPermissions);
    };

    const editCheckBox = (module: any, e: any) => {
      const children: string[] = [];
      module[1]?.forEach((child: string) => {
        children.push(child[0]);
      });
      if (e.target.checked) {
        const updatedPermissions = { ...givedPermissions, edit: [...givedPermissions.edit, module[0], ...children] };
        if (parent && parent.length > 0 && parent[1]?.length > 0) {
          const parentChild: string[] = parent[1]?.map((x: string) => x[0]);
          if (parentChild.every((child: string) => updatedPermissions.edit.includes(child))) {
            updatedPermissions.edit.push(parent[0]);
          }
        }
        setPermissions(updatedPermissions);
      } else {
        const temp = { ...givedPermissions };
        temp.edit = temp.edit.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
        setPermissions(temp);
      }
    };

    const addCheckBox = (module: any, e: any) => {
      const children: string[] = [];
      module[1]?.forEach((child: string) => {
        children.push(child[0]);
      });
      if (e.target.checked) {
        const updatedPermissions = { ...givedPermissions, add: [...givedPermissions.add, module[0], ...children] };
        if (parent && parent.length > 0 && parent[1]?.length > 0) {
          const parentChild: string[] = parent[1]?.map((x: string) => x[0]);
          if (parentChild.every((child: string) => updatedPermissions.add.includes(child))) {
            updatedPermissions.add.push(parent[0]);
          }
        }
        setPermissions(updatedPermissions);
      } else {
        const temp = { ...givedPermissions };
        temp.add = temp.add.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
        setPermissions(temp);
      }
    };

    const viewCheckBox = (module: any, e: any) => {
      const children: string[] = [];
      module[1]?.forEach((child: string) => {
        children.push(child[0]);
      });
      if (e.target.checked) {
        const updatedPermissions = { ...givedPermissions, view: [...givedPermissions.view, module[0], ...children] };
        if (parent && parent.length > 0 && parent[1]?.length > 0) {
          const parentChild: string[] = parent[1]?.map((x: string) => x[0]);
          if (parentChild.every((child: string) => updatedPermissions.view.includes(child))) {
            updatedPermissions.view.push(parent[0]);
          }
        }
        setPermissions(updatedPermissions);
      } else {
        const temp = { ...givedPermissions };
        temp.view = temp.view.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
        setPermissions(temp);
      }
    };

    const deleteCheckBox = (module: any, e: any) => {
      const children: string[] = [];
      module[1]?.forEach((child: string) => {
        children.push(child[0]);
      });
      if (e.target.checked) {
        const updatedPermissions = { ...givedPermissions, delete: [...givedPermissions.delete, module[0], ...children] };
        if (parent && parent.length > 0 && parent[1]?.length > 0) {
          const parentChild: string[] = parent[1]?.map((x: string) => x[0]);
          if (parentChild.every((child: string) => updatedPermissions.delete.includes(child))) {
            updatedPermissions.delete.push(parent[0]);
          }
        }
        setPermissions(updatedPermissions);
      } else {
        const temp = { ...givedPermissions };
        temp.delete = temp.delete.filter((x) => ![module?.[0], ...children, parent?.[0]].includes(x));
        setPermissions(temp);
      }
    };

    const renderModules = (modules: any[], prefix: number) => {
      return modules.map((module, index) => (
        <React.Fragment key={index}>
          <tr className="border">
            <td>
              <input type="checkbox" checked={(givedPermissions.view.includes(module[0]) && givedPermissions.add.includes(module[0]) && givedPermissions.delete.includes(module[0]) && givedPermissions.edit.includes(module[0])) || (givedPermissions.view.includes(parent?.[0]) && givedPermissions.add.includes(parent?.[0]) && givedPermissions.delete.includes(parent?.[0]) && givedPermissions.edit.includes(parent?.[0])) ? true : false} onChange={(e) => allCheckBox(module, e)} />
            </td>
            <td className={"text-start flex " + (module[1] && "text-[#5970F5] underline")} style={{ paddingLeft: k + "px", cursor: module[1] && "pointer" }} onClick={() => handleModuleClick(prefix + index)}>
              {module[0]}
            </td>
            <td>
              <input
                type="checkbox"
                checked={givedPermissions.view.includes(module[0]) || givedPermissions.view.includes(parent?.[0]) ? true : false}
                onChange={(e) => {
                  viewCheckBox(module, e);
                }}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={givedPermissions.add.includes(module[0]) || givedPermissions.add.includes(parent?.[0]) ? true : false}
                onChange={(e) => {
                  addCheckBox(module, e);
                }}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={givedPermissions.edit.includes(module[0]) || givedPermissions.edit.includes(parent?.[0]) ? true : false}
                onChange={(e) => {
                  editCheckBox(module, e);
                }}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={givedPermissions.delete.includes(module[0]) || givedPermissions.delete.includes(parent?.[0]) ? true : false}
                onChange={(e) => {
                  deleteCheckBox(module, e);
                }}
              />
            </td>
          </tr>
          {expandedModules.includes(prefix + index) && module[1]?.length > 0 && <PermissionTable modules={module[1]} parent={module} k={k + 20} />}
        </React.Fragment>
      ));
    };

    return <>{renderModules(modules, k)}</>;
  };

  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Manage Permission</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full pt-3 h-[80%] overflow-auto shadow-md mt-4">
            <table className="w-full ">
              <thead className="bg-[#5970F5] text-white ">
                <tr>
                  <th rowSpan={2}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...givedPermissions, view: createdModules.map((item) => item[0]), edit: createdModules.map((item) => item[0]), delete: createdModules.map((item) => item[0]), add: createdModules.map((item) => item[0]) });
                        } else {
                          setPermissions({ ...givedPermissions, view: [], add: [], delete: [], edit: [] });
                        }
                      }}
                    />
                  </th>
                  <th rowSpan={2} className="text-start">
                    Module
                  </th>
                  <th colSpan={4}>Actions</th>
                </tr>

                <tr>
                  <th>View</th>
                  <th>Add</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="capitalize">
                <PermissionTable />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;

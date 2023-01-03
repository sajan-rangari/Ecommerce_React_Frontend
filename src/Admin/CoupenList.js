import React, { useMemo } from "react";
import { Button, Space, Table, Modal, Tag } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import {
  faPenToSquare,
  faTrash,
  faRightFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
const Context = React.createContext({
  name: "Default",
});

const CoupenList = ({
  setIsLogin,
  coupens,
  setEditCoupen,
  setIsChange,
  isChange,
  token,
  url,
}) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, coupenName) => {
    api.success({
      message: `Coupen Deleted`,
      description: (
        <Context.Consumer>
          {({ name }) => ` ${coupenName} Coupen Deleted Successfully !!`}
        </Context.Consumer>
      ),
      placement,
      duration: 2,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "",
    }),
    []
  );

  var color = "";
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
      render: (discountType) => {
        discountType == "Percentage" ? (color = "volcano") : (color = "green");
        return <Tag color={color}>{discountType}</Tag>;
      },
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Min Order Amount",
      key: "minOrderAmount",
      dataIndex: "minOrderAmount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => showDeleteConfirm(record)}
            danger
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            type="primary"
            onClick={() => onUpdateCoupen(record)}
            style={{ background: "green" }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Space>
      ),
    },
  ];
  const onDeleteCoupen = (coupen) => {
    fetch(`${url}/api/v1/coupens/${coupen._id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsondata) => {
        console.log(jsondata);
        openNotification("topRight", coupen.name);
        setIsChange(!isChange);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUpdateCoupen = (coupen) => {
    setEditCoupen(coupen);
    navigate(`/edit-coupen/${coupen._id}`);
  };

  const onLogout = () => {
    setIsLogin(true);
    navigate("/login");
  };

  const createCoupen = () => {
    navigate("/coupen-form");
  };
  const { confirm } = Modal;

  const showDeleteConfirm = (coupen) => {
    confirm({
      title: "Are you sure delete this coupen?",
      icon: <ExclamationCircleFilled />,
      content: coupen.name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDeleteCoupen(coupen);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
      <Space style={{ marginLeft: "1000px", marginTop: "10px" }}>
        <Button type="primary" onClick={() => createCoupen()}>
          <span style={{ marginRight: "10px" }}>New Coupen</span>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          type="primary"
          onClick={() => onLogout()}
          style={{ background: "gray", marginLeft: "auto" }}
        >
          <span style={{ marginRight: "10px" }}>Logout</span>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={coupens}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default CoupenList;

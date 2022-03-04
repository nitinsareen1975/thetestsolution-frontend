import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Pie, measureTextWidth, Column } from "@ant-design/plots";
import { Card, Row, Col, Table, Space, Button, Tooltip, Spin } from "antd";
import { TeamOutlined, EyeOutlined, LinkOutlined, ExperimentOutlined, FieldTimeOutlined, CheckCircleOutlined, AimOutlined } from "@ant-design/icons";
import GlobalAPI from "../../../redux/api/global-api";
import moment from "moment";
const AdminDashboard = ({ ...props }) => {
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({});
  const [totalAppointmentsPastWeek, setTotalAppointmentsPastWeek] = useState(0);
  useEffect(async () => {
    setSubmitted(true);
    await GlobalAPI.getDashboardStats().then(resp => {
      if (resp.status && resp.status === true) {
        console.log("resp:", resp);
        setStats(resp.data);
      } else {
        if (resp.message) {
          notifyUser(resp.message, "error");
        } else {
          notifyUser("User not found.", "error");
        }
      }
      setSubmitted(false);
    }).catch(() => {
      setSubmitted(false);
    });
  }, []);

  const AppointmentsPast2Weeks = () => {
    var startDate = moment().subtract(6, 'days');
    var endDate = moment();
    var data = [];
    var now = startDate.clone();
    while (now.isSameOrBefore(endDate)) {
      data.push({
        date: now.format('YYYY-MM-DD'),
        sales: 0
      });
      now.add(1, 'days');
    }
    if (stats.total_appointments_past_week && stats.total_appointments_past_week.length > 0) {
      setTotalAppointmentsPastWeek(stats.total_appointments_past_week.length);
      stats.total_appointments_past_week.map(r => {
        var foundIndex = data.findIndex(x => moment(x.date).format("YYYY-MM-DD") === moment(r.created_at).format("YYYY-MM-DD"));
        if (foundIndex > -1) {
          data[foundIndex].sales = data[foundIndex].sales + 1;
        }
      });
    }
    const config = {
      data,
      xField: "date",
      yField: "sales",
      label: {
        position: "middle",
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: "Category",
        },
        sales: {
          alias: "Appointments",
        },
      },
    };
    return <Column style={{ height: 340 }} {...config} />;
  };
  const TotalTestByTop5Labs = () => {
    function renderStatistic(containerWidth, text, style) {
      const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
      const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

      let scale = 1;

      if (containerWidth < textWidth) {
        scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
      }

      const textStyleStr = `width:${containerWidth}px;`;
      return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }
    const data = stats.total_tests_by_top5_labs.map(r => {
      return {
        type: r.lab_name,
        value: parseInt(r.total_tests)
      }
    });
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: (v) => `${v}`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: {
          textAlign: 'center',
        },
        autoRotate: false,
        content: '{value}',
      },
      legend: {
        position: 'right'
      },
      statistic: {
        title: {
          offsetY: -4,
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
            const text = datum ? datum.type : 'Total';
            return renderStatistic(d, text, {
              fontSize: 28,
            });
          },
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '32px',
          },
          customHtml: (container, view, datum, data) => {
            const { width } = container.getBoundingClientRect();
            const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
            return renderStatistic(width, text, {
              fontSize: 32,
            });
          },
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
        {
          type: 'pie-statistic-active',
        },
      ],
    };
    return <Pie style={{ height: 340 }} {...config} />;
  };
  const LatestAppointments = [
    {
      title: 'Patient Name',
      render: (_text, row) => <div>{row.firstname} {row.lastname}</div>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email'
    },
    {
      title: 'Phone #',
      dataIndex: 'phone'
    },
    {
      title: 'Scheduled Date/Time',
      render: (_text, row) => <div>{row.scheduled_date} {moment(row.scheduled_time).format("HH:MM A")}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button onClick={() => window.open("./admin/patients/edit/" + record.id)} >
              <LinkOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={submitted}>
      {typeof stats.total_patients !== "undefined" ?
        <>
          <Row gutter={24} style={{ marginBottom: "24px", }}>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={true}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#4044af",
                      borderRadius: "100%",
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      textAlign: "center",
                      marginRight: "20px",
                    }}>
                    <TeamOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ display: "block" }}>Total Patients</h4>
                    <p style={{ display: "block", margin: "0" }}>{stats.total_patients}</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={true}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#4044af",
                      borderRadius: "100%",
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      textAlign: "center",
                      marginRight: "20px",
                      marginTop: "4px",
                    }}>
                    <AimOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginTop: 14,
                        marginLeft: 2
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ display: "block" }}>Scheduled List</h4>
                    <p style={{ display: "block", margin: "0" }}>{stats.total_scheduled_patients}</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={true}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#4044af",
                      borderRadius: "100%",
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      textAlign: "center",
                      marginRight: "20px",
                      marginTop: "4px",
                    }}>
                    <FieldTimeOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginTop: 14,
                        marginLeft: 3
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ display: "block" }}>Pending Results</h4>
                    <p style={{ display: "block", margin: "0" }}>{stats.total_pending_results}</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={true}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#4044af",
                      borderRadius: "100%",
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      textAlign: "center",
                      marginRight: "20px",
                      marginTop: "4px",
                    }}>
                    <CheckCircleOutlined
                      style={{
                        color: "white",
                        fontSize: "20px",
                        marginTop: 14,
                        marginLeft: 2
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ display: "block" }}>Completed Results</h4>
                    <p style={{ display: "block", margin: "0" }}>{stats.total_completed_results}</p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "24px", }}>
            <Col xs={16} sm={16}>
              <Card title={<span>Appointments Past Week ({totalAppointmentsPastWeek})</span>} bordered={true}>
                <AppointmentsPast2Weeks />
              </Card>
            </Col>
            <Col xs={8} sm={8}>
              <Card title="Total Tests by Top 5 Labs" bordered={false}>
                <TotalTestByTop5Labs />
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: "24px", }}>
            <Col xs={24} sm={24}>
              <Card className="appointment-table" title="Latest Appointments" bordered={false}>
                <Table pagination={false} columns={LatestAppointments} dataSource={stats.latest_appointments} />
                <div style={{ textAlign: "right", marginTop: 15, marginBottom: 15 }}>
                  <Button type="primary" onClick={() => props.history.push("./admin/all-patients", { progress_status: "1" })}>
                    View All Appointments
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </>
        : ""}
    </Spin>
  );
};

export default AdminDashboard;

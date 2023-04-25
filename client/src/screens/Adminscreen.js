import React from 'react'
import { Tabs } from "antd";
const { TabPane } = Tabs;
function Adminscreen() {
  return (
    <div>
        <h1>Admin Screen</h1>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <h1>Bookings</h1>
          
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <h1>Rooms</h1>
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <h1>Add Romms</h1>
        </TabPane>
        <TabPane tab="Users" key="4">
          <h1>Users</h1>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Adminscreen

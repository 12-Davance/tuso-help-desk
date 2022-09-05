import React from 'react'
import {Monitor, Activity, User, Sliders} from "react-feather"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Activity size={20} />,
    navLink: "/dashboard"
  },
  {
    id: "serviceDesk",
    title: "Service Desk",
    icon: <Monitor size={20} />,
    children: [
        {
          id: 'newTicket',
          title: 'New Ticket',
          navLink: 'new-ticket'
        },
        {
          id: 'ticketList',
          title: 'Ticket List',
            navLink: 'ticket-list'
        },
        {
          id: 'pendingTicket',
          title: 'Pending Ticket',
            navLink: 'pending-ticket'
        },
        {
          id: 'overDue',
          title: 'Over Due',
            navLink: 'over-due'
        }
        ]
  },
  {
        id: "userManagement",
        title: "User Management",
        icon: <User size={20} />,
        children: [
            {
                id: 'userList',
                title: 'User List',
                navLink: '/user-list'
            },
            {
                id: 'userGroup',
                title: 'User Group',
                navLink: '/user-group',
                children: [
                    {id: 'addNewGroup', title: 'Add New Group', navLink: '/add-new-group'},
                    {id: 'groupList', title: 'Group List', navLink: '/group-list'}
                ]
            },
            {
                id: 'role',
                title: 'Role',
                navLink: '/role',
                children: [
                    {id: 'roleList', title: 'Role List', navLink: '/role-list'},
                    {id: 'rolePermissionManager', title: 'Role Permission Manager', navLink: '/role-permission-manager'}
                ]
            }
        ]
    },
    {
        id: "configuration",
        title: "Configuration",
        icon: <Sliders size={20} />,
        children: [
            {
                id: 'categories',
                title: 'Categories',
                navLink: '/categories'
            },
            {
                id: 'healthFacility',
                title: 'Health Facility',
                navLink: '/health-facility'
            },
            {
                id: 'healthFacilityDepartment',
                title: 'Health Facility Department',
                navLink: '/health-facility-department'
            },
            {
                id: 'country',
                title: 'Country',
                navLink: '/country'
            },
            {
                id: 'province',
                title: 'Province',
                navLink: '/province'
            },
            {
                id: 'district',
                title: 'District',
                navLink: '/district'
            },
            {
                id: 'operatingHours',
                title: 'Operating Hours',
                navLink: '/operating-hours'
            },
            {
                id: 'escalationRules',
                title: 'Escalation Rules',
                navLink: '/escalation-rules'
            },
            {
                id: 'sla',
                title: 'SLA',
                navLink: '/sla'
            },
            {
                id: 'priority',
                title: 'Priority',
                navLink: '/priority'
            }
        ]
    }
]

// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"
import Dashboard from "../../views/Dashboard"
import NewTicket from "../../views/service-desk/NewTicket"
import TicketList from "../../views/service-desk/TicketList"
import PendingTicket from "../../views/service-desk/PendingTicket"
import OverDue from "../../views/service-desk/OverDue"
import AddEditUserModal from "../../views/user-management/user/user-manage/add-edit-user-modal"
import UserList from "../../views/user-management/user/user-list/user-list"
import AddNewGroup from "../../views/user-management/user-group/AddNewGroup"
import GroupList from "../../views/user-management/user-group/GroupList"
import RoleList from "../../views/user-management/role/RoleList"
import RolePermissionManager from "../../views/user-management/role/RolePermissionManager"
import Categories from "../../views/configuration/Categories"
import HealthFacility from "../../views/configuration/HealthFacility"
import HealthFacilityDepartment from "../../views/configuration/HealthFacilityDepartment"
import Country from "../../views/configuration/Country"
import Province from "../../views/configuration/Province"
import District from "../../views/configuration/District"
import OperatingHours from "../../views/configuration/OperatingHours"
import EscalationRules from "../../views/configuration/EscalationRules"
import SLA from "../../views/configuration/SLA"
import Priority from "../../views/configuration/Priority"
import AddNewDevice from "../../views/asset/AddNewDevice"
import DeviceList from "../../views/asset/DeviceList"
import DeviceMonitoring from "../../views/asset/DeviceMonitoring"
import SingleUserView from "../../views/user-management/user/single-user-view/single-user-view"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - TUSO Help Desk"

// ** Default Route
const DefaultRoute = "/login"

const Home = lazy(() => import("../../views/Home"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/new-ticket",
    element: <NewTicket />
  },
  {
    path: "/ticket-list",
    element: <TicketList />
  },
  {
    path: "/pending-ticket",
    element: <PendingTicket />
  },
  {
    path: "/over-due",
    element: <OverDue />
  },
  {
    path: "/add-new-user",
    element: <AddEditUserModal />
  },
  {
    path: "/user-list",
    element: <UserList />
  },
  {
    path: "/user-list/single-user-view/:id",
    element: <SingleUserView />
  },
  {
    path: "/add-new-group",
    element: <AddNewGroup />
  },
  {
    path: "/group-list",
    element: <GroupList />
  },
  {
    path: "/role-list",
    element: <RoleList />
  },
  {
    path: "/role-permission-manager",
    element: <RolePermissionManager />
  },
  {
    path: "/categories",
    element: <Categories />
  },
  {
    path: "/health-facility",
    element: <HealthFacility />
  },
  {
    path: "/health-facility-department",
    element: <HealthFacilityDepartment />
  },
  {
    path: "/country",
    element: <Country />
  },
  {
    path: "/province",
    element: <Province />
  },
  {
    path: "/district",
    element: <District />
  },
  {
    path: "/operating-hours",
    element: <OperatingHours />
  },
  {
    path: "/escalation-rules",
    element: <EscalationRules />
  },
  {
    path: "/sla",
    element: <SLA />
  },
  {
    path: "/priority",
    element: <Priority />
  },
  {
    path: "/add-new-device",
    element: <AddNewDevice />
  },
  {
    path: "/device-list",
    element: <DeviceList />
  },
  {
    path: "/device-monitoring",
    element: <DeviceMonitoring />
  },
  {
    path: "/my-settings",
    element: <AddEditUserModal />
  },
  {
    path: "/admin-portal",
    element: <AddEditUserModal />
  },
  {
    path: "/client-portal",
    element: <AddEditUserModal />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }

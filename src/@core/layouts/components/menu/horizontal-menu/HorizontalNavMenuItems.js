// ** Menu Components Imports
import React from "react"
import HorizontalNavMenuLink from "./HorizontalNavMenuLink"
import HorizontalNavMenuGroup from "./HorizontalNavMenuGroup"
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils"
import {canViewMenuGroup, canViewMenuItem} from "../../../utils"

const HorizontalNavMenuItems = (props) => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children) {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return canViewMenuItem(item) && <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems

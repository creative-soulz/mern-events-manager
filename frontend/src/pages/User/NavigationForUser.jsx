import React from "react";
import Navbar from "../Auth/Navbar";
import {Link, NavLink } from "react-router-dom";
import {
  
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  

  Accordion,
  AccordionHeader,
  AccordionBody,
  
 
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  HomeIcon,
  FlagIcon,
  TableCellsIcon,
  ClockIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
 
export default function SidebarWithBurgerMenuForUser() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <>
    <div className="inline-flex w-[100%]">

      <button variant="text" size="lg" className="bg-[#1F2833]  " onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
        )}
      </button>
      <Navbar className="  bg-[#1f2833]" />
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <div
        
          color="transparent"
          shadow={false}
          className="h-[calc(120vh-2rem)] bg-[#1F2833]  text-white w-full p-4 overflow-auto"
        >
          <div className="mb-2  flex items-center gap-4 p-4">
           
            <Typography variant="h5" color="white">
             HELLO !!!
            </Typography>
          </div>
         
          <List>
            
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                color="white"
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              
             
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/home">
              Home</Link>

                
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <FlagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to='/events'>
              Events</Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <TableCellsIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/point">
              Scores</Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ClockIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/schedule">
              Schedule</Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                
              </ListItemPrefix>
              <Link to="/schedule">
             </Link>
            </ListItem>
          </List>
       
        </div>
      </Drawer>
    </>
  );
}
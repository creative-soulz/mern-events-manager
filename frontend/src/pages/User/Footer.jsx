import { Typography } from "@material-tailwind/react";
 
export default function SimpleFooter() {
  return (
    <footer className="text-center bg-[#1f2833]">
      <Typography color="white" className="font-normal">
        &copy;Event Management System 
      </Typography>
      
    </footer>
  );
}
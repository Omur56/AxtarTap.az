import React, { useEffect, useState } from "react";
import axios from "axios";
import Katalog from "../../../../src/pages/Katalog";
import CreatePost from "../../../components/CreatePostNeqliyyat";



export default function Neqliyyat() {

  return (
    <div className="mx-auto  my-auto max-w-[1000px]">
      <Katalog />
     
   <CreatePost   />
      
    
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Katalog from "../../Katalog";
import CreatePost from "../../../components/CreatePostNeqliyyat";
import { hasFormSubmit }  from "@testing-library/user-event/dist/utils";
import TitleLogo from "../../../components/TitleLogo";

export default function Neqliyyat() {

  return (
    <div className="mx-auto  my-auto max-w-[1200px]">
      <TitleLogo />
      <Katalog />
     
   <CreatePost disabled={hasFormSubmit}  />
      
    
    </div>
  );
}

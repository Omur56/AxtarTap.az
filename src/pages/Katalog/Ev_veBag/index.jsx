import Katalog from "../../Katalog";
import CreatePostForHomeAndGarden from "../../../components/CreatePostHome";
import { hasFormSubmit }  from "@testing-library/user-event/dist/utils";
import axios from "axios";
import TitleLogo from "../../../components/TitleLogo";


function EvVəBag () {

    return (
        
         <div className="mx-auto  my-auto max-w-[1200px]">
        <TitleLogo />
       

        < Katalog />
        <CreatePostForHomeAndGarden disabled={hasFormSubmit} />
       
    </div>
    )
    }
    
    export default EvVəBag;
import Katalog from "../../Katalog";
import TitleLogo from "../../../components/TitleLogo";

import CreateAccessoryPost from "../../../components/CreateAccessoryPost";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

function Ehtiyyat_hissələri_ve_aksesuarlar() {
    return (
        <div className="mx-auto my-auto max-w-[1200px]">
            <TitleLogo />
            <Katalog />
            <CreateAccessoryPost disabled={hasFormSubmit} />
        
        </div>
    )
};

export default Ehtiyyat_hissələri_ve_aksesuarlar;
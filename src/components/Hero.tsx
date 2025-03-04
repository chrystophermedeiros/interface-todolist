import { useUser } from "@/hooks/UserContext";
import { IcBaselineLogout } from "@/icons/baseline-logout";
import { getGithubAvatar } from "@/services/apiGitHub";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InfoItem } from "./InfoItem";

export const Hero = () => {
  const { userData, logout } = useUser();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (userData?.user?.usernameGitHub) {
        const url = await getGithubAvatar(userData.user.usernameGitHub);
        setAvatarUrl(url);
      }
    };

    fetchAvatarUrl();
  }, []);

  return (
    <main title="Clique para abrir o menu">
      {userData?.user && (
        <div className="flex flex-col ">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="rounded-full border-2 border-color-transparent cursor-pointer hover:border-color-green-forest hover:border-2 hover:transition-all hover:duration-100"
          >
            {avatarUrl && (
              <Image
                width={50}
                height={50}
                className="rounded-full"
                src={avatarUrl || "https://api.github.com/users/teste"}
                priority
                alt="GitHub Avatar"
              />
            )}
          </div>
          {showDropdown && (
            <div
              onClick={() => setShowDropdown(false)}
              title="Clique para fechar o menu de opções"
              className="absolute flex flex-col gap-2 max-w-96 bg-background-primary border-b-2 border-background-primary shadow-md rounded-2xl p-4 right-1 top-16"
            >
              <InfoItem
                labelClass="text-color-black-blue"
                label="ID"
                value={userData.user.id}
              />
              <InfoItem
                labelClass="text-color-black-blue"
                label="E-mail"
                value={userData.user.email}
              />
              <InfoItem
                labelClass="text-color-black-blue"
                label="Nome"
                value={userData.user.name}
              />
              <InfoItem
                labelClass="text-color-black-blue"
                label="UsernameGitHub"
                value={userData.user.usernameGitHub}
              />
              <button
                title="Sair do sistema"
                className="w-full border-2 rounded-lg mb-2 p-1 text-color-green-forest  shadow-md hover:bg-color-orange-fire hover:text-color-white"
                onClick={logout}
              >
                <span className="flex justify-center align-center gap-3 font-bold">
                  <IcBaselineLogout className="size-5" /> Sair
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

import { AvatarImageProps } from "@/@types";
import Image from "next/image";

export const Avatar = ({ name, url }: AvatarImageProps) => {

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
        event.currentTarget.style.opacity = "1";
    }

    return (
        <div>
            <Image className="w-32 h-32 rounded object-cover"
                src={url}
                alt={name}
                onLoad={handleLoad}
                priority
                width={500}
                height={500}
            />
        </div>
    )
}

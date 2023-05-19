import React, { useEffect, useState } from 'react'
import { AvatarImageProps, SchemaTypeProps } from '@/@types'
import { Avatar } from './Avatar'
import { getAll } from '@/connections'

const UserData = (props: SchemaTypeProps) => {
    const [photos, setPhotos] = useState<AvatarImageProps[]>([])
    const [loading, setLoading] = React.useState(false)

    const getPhotos = async () => {
        setLoading(true);
        const allPhotos = await getAll();
        const filteredPhotos = allPhotos.filter(item => item.name === props.username);
        setPhotos(filteredPhotos);
        setLoading(false);
    };

    useEffect(() => {
        getPhotos()
    }, [props.username])

    return (
        <section className="flex flex-col w-full bg-purple-500">
            {loading ? <p>Carregando..</p> : props && (
                <div>
                    <h2>{props.username}</h2>

                    {!loading && photos.length ? (
                        <div>
                            {photos?.map((item, index) => (
                                <Avatar
                                    key={index}
                                    url={item.url}
                                    name={props.username}
                                />
                            ))}
                        </div>
                    ) : ''}

                    <p>{props.email}</p>
                    <p>{props.password}</p>
                    <p>{props.confirmPassword}</p>
                    <p>{props.phone}</p>
                    <p>{props.agree}</p>
                    <p>{props.select}</p>
                    <p>{props.cpf}</p>
                    <p>{props.date}</p>
                    <p>{props.url}</p>
                    <p>{props.role}</p>
                    <div>{props.techs?.map(tech => (
                        <ul key={tech.title}>
                            <li>{tech.title} - nível: <span>{tech.knowledge}</span></li>
                        </ul>
                    ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default UserData
import { Box, IconButton, Input, Image, Flex } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { FiBox, FiTrash } from "react-icons/fi";

interface Props {
    setFile: (image: any) => void
    file: any,
    image?: string
}

export const ImageLoadButton = ({ setFile, file, image }: Props) => {
    //const [file, setFile] = useState(null);
    const [imagePrev, setImagePrev] = useState("" as string);
    const fileInputRef = useRef();

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = function (event) {
            //var img = document.getElementById('img1');
            //img.src= event.target.result;
            setImagePrev(event?.target?.result as string)
        }
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (image)
            setImagePrev(image)
        else
            setImagePrev("")
    }, [image])

    const handleClick = () => {
        (fileInputRef.current as any).click();
    };

    return (
        <Box position={'relative'}>
            <Input
                type="file"
                accept=".jpg, .jpeg"
                display={'none'}
                ref={fileInputRef as any}
                onChange={handleFileChange}
            />
            {file && (
                <IconButton
                    size={'xs'}
                    borderRadius={'full'}
                    aria-label="eliminar"
                    color={'white'}
                    colorScheme={'red'}
                    icon={<FiTrash />}
                    position={'absolute'}
                    top={0}
                    right={0}
                    marginTop={'-8px'}
                    marginRight={'-8px'}
                    onClick={() => {
                        setFile(null)
                        setImagePrev("")
                    }}
                />
            )}
            <Flex
                onClick={handleClick}
                w={'80px'}
                h={'80px'}
                borderRadius={'6px'}
                border={'1px solid'}
                borderColor={'gray.200'}
                cursor={'pointer'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Image src={imagePrev} />
                {!file && (<FiBox size={'50px'} color="silver"/>)}
            </Flex>
        </Box>
    )
}
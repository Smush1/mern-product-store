import { Box, HStack, Heading, IconButton, Image, Text,useColorModeValue, Modal, ModalCloseButton, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalFooter, VStack, Button, Input } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const ProductCard = ({product, key})=> {
  const textColor = useColorModeValue("white", "gray.800");
  const bg=useColorModeValue("white", "gray.800");
  
  const [updatedProduct, setUpdatedProduct ] = useState(product);

  const {deleteProduct, updateProduct } =useProductStore()
  const toast = useToast()

  const handleUpdateProduct = async(pid, updatedProduct)=>{
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDeleteProduct = async(pid) => {
    const { success, message} = await deleteProduct(pid);
    if(!success){
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
    else{
        toast({
            title: 'Success',
            description: message,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }
  }

  return (
   <Box
   id={key}
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{ transform: "translateY(-5px)", shadow: 'xl'}}
    bg={bg}
   >
    <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />
    <Box p={4}>
        <Heading as="h3" size='md' mb={2}>
            {product.name}
        </Heading>
        <Text fontweight='bold' fontSize="xl" color={textColor} mb={4} >
            ${product.price}
        </Text>
        <HStack>
            <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
            <IconButton icon={<DeleteIcon />}  onClick={()=>handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Update Products</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
                            <VStack spacing={4}>
                                <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                                />
                                <Input
                                placeholder='Price'
                                name='price'
                                value={updatedProduct.price}
                                onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}
                                />
                                <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}
                                />
                            </VStack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3}  onClick={()=>{handleUpdateProduct(product._id, updatedProduct)}} >
            Update
        </Button>
        <Button variant='black' onClick={onClose}>
            Cancel
        </Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
   </Box>

  )
}

export default ProductCard
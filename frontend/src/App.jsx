import React, { useState } from 'react';
import { 
  ChakraProvider, Box, Flex, Text, SimpleGrid, Stat, StatLabel, StatNumber, 
  Spinner, VStack, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Mail, Shield, Zap } from "lucide-react";
import theme from "./theme";
import DataCore from "./components/DataCore";
import { useFetchLogs } from './hooks/useFetchLogs';
import LogStream from './components/LogStream';

const MotionBox = motion.create(Box);

function App() {
  const { logs, loading } = useFetchLogs();
  const [filter, setFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filter logic for the log stream
  const filteredLogs = filter === "ALL" 
    ? logs 
    : logs.filter(log => log.category === filter);

  const categories = ["ALL", "CRM", "REFUNDS", "ORDERS"];

  const handleOpenLog = (log) => {
    setSelectedLog(log);
    onOpen();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" position="relative" overflow="hidden" bg="bg.deep">
        
        {/* Background 3D Canvas */}
        <Box position="absolute" top="0" right="-10%" bottom="0" width="50%" zIndex="0" opacity="0.4">
          <Canvas>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <DataCore />
          </Canvas>
        </Box>

        <Box position="relative" zIndex="1" p={10}>
          {/* Header */}
          <Flex align="center" mb={10}>
            <Box bg="brand.500" p={2} borderRadius="xl" mr={4}>
              <Shield size={32} color="white" />
            </Box>
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight">
              FLUX<span style={{ color: "#0066ff" }}>CORE</span>
            </Text>
          </Flex>

          {/* Main Layout - Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
            <StatCard label="Active Ingestion" val="Running" icon={<Zap color="#0066ff" />} />
            <StatCard label="AI Classification" val="Mistral-7B" icon={<Mail color="#0066ff" />} />
            <StatCard label="Logs Processed" val={logs.length || "0"} icon={<Shield color="#0066ff" />} />
          </SimpleGrid>

          {/* Real-time Intelligent Stream Section */}
          <MotionBox
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             minH="500px"
             maxH="650px"
             bg="bg.card"
             borderRadius="3xl"
             border="1px solid"
             borderColor="whiteAlpha.100"
             p={10}
             overflowY="auto"
             css={{
               '&::-webkit-scrollbar': { width: '4px' },
               '&::-webkit-scrollbar-track': { background: 'transparent' },
               '&::-webkit-scrollbar-thumb': { background: '#0066ff', borderRadius: '10px' },
             }}
          >
            <Flex justify="space-between" align="flex-start" mb={8}>
              <VStack align="start" spacing={3}>
                <Text color="whiteAlpha.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                  Intelligent Flux Stream
                </Text>
                <HStack spacing={2}>
                  {categories.map((cat) => (
                    <Box
                      key={cat}
                      as="button"
                      onClick={() => setFilter(cat)}
                      px={4} py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      bg={filter === cat ? "brand.500" : "whiteAlpha.100"}
                      color={filter === cat ? "white" : "whiteAlpha.600"}
                      transition="0.2s"
                      _hover={{ bg: filter === cat ? "brand.600" : "whiteAlpha.200" }}
                    >
                      {cat}
                    </Box>
                  ))}
                </HStack>
              </VStack>

              <Box bg="whiteAlpha.50" px={4} py={2} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
                <HStack spacing={3}>
                  <Box 
                    w={2} h={2} 
                    bg={loading ? "orange.400" : "green.400"} 
                    borderRadius="full" 
                    boxShadow={loading ? "0 0 10px #fbbf24" : "0 0 10px #4ade80"}
                    className="animate-pulse"
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="10px" fontWeight="bold" color="whiteAlpha.500">DATABASE STATUS</Text>
                    <Text fontSize="xs" fontWeight="bold" color="white">
                      {loading ? "SYNCING..." : "NEURAL LINK ACTIVE"}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Flex>

            {loading ? (
              <Flex h="300px" direction="column" align="center" justify="center" gap={4}>
                <Spinner color="brand.500" size="xl" thickness="4px" />
                <Text color="whiteAlpha.500" fontSize="lg">Syncing Aiven Cloud Engine...</Text>
              </Flex>
            ) : filteredLogs.length > 0 ? (
              <LogStream logs={filteredLogs} onLogClick={handleOpenLog} />
            ) : (
              <Flex h="300px" align="center" justify="center">
                <Text color="whiteAlpha.300" fontSize="lg">No logs found for "{filter}"</Text>
              </Flex>
            )}
          </MotionBox>
        </Box>

        {/* Intelligence Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg="bg.card" border="1px solid" borderColor="whiteAlpha.200" color="white" borderRadius="2xl">
            <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100">Intelligence Insight</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={10} pt={6}>
              {selectedLog && (
                <VStack align="start" spacing={6}>
                  <Box w="full">
                    <Text color="brand.500" fontSize="xs" fontWeight="bold" mb={1}>SENDER SOURCE</Text>
                    <Text fontWeight="medium">{selectedLog.emailFrom}</Text>
                  </Box>
                  <Box w="full">
                    <Text color="brand.500" fontSize="xs" fontWeight="bold" mb={1}>CLASSIFICATION DOMAIN</Text>
                    <Text fontWeight="medium">{selectedLog.category}</Text>
                  </Box>
                  <Box bg="whiteAlpha.50" p={6} borderRadius="xl" w="full" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="brand.500" fontSize="xs" fontWeight="bold" mb={3}>AI REASONING LOG</Text>
                    <Text fontSize="sm" lineHeight="tall" color="whiteAlpha.800">{selectedLog.reason}</Text>
                  </Box>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

// Sub-component for Stats to keep main App clean
const StatCard = ({ label, val, icon }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    bg="bg.card"
    p={8}
    borderRadius="2xl"
    border="1px solid"
    borderColor="whiteAlpha.100"
    backdropFilter="blur(10px)"
  >
    <Flex justify="space-between" mb={4}>{icon}</Flex>
    <Stat>
      <StatLabel color="whiteAlpha.600">{label}</StatLabel>
      <StatNumber fontSize="3xl">{val}</StatNumber>
    </Stat>
  </MotionBox>
);

export default App;
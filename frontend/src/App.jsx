import React, { useState } from 'react';
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Text, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  Spinner,
  VStack,
  HStack
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

  // Filter logic for the log stream
  const filteredLogs = filter === "ALL" 
    ? logs 
    : logs.filter(log => log.category === filter);

  const categories = ["ALL", "CRM", "REFUNDS", "ORDERS"];

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
          <Flex align="center" mb={20}>
            <Box bg="brand.500" p={2} borderRadius="xl" mr={4}>
              <Shield size={32} color="white" />
            </Box>
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight">
              FLUX<span style={{ color: "#0066ff" }}>CORE</span>
            </Text>
          </Flex>

          {/* Main Layout - Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={20}>
            {[
              { label: "Active Ingestion", val: "Running", icon: <Zap color="#0066ff" /> },
              { label: "AI Classification", val: "Mistral-7B", icon: <Mail color="#0066ff" /> },
              { label: "Logs Processed", val: logs.length || "0", icon: <Shield color="#0066ff" /> }
            ].map((item, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                bg="bg.card"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(10px)"
              >
                <Flex justify="space-between" mb={4}>{item.icon}</Flex>
                <Stat>
                  <StatLabel color="whiteAlpha.600">{item.label}</StatLabel>
                  <StatNumber fontSize="3xl">{item.val}</StatNumber>
                </Stat>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Real-time Intelligent Stream Section */}
          <MotionBox
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             minH="450px"
             maxH="600px"
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
              <VStack align="start" spacing={1}>
                <Text color="whiteAlpha.400" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                  Real-time Intelligent Stream
                </Text>
                <HStack spacing={2} mt={2}>
                  {categories.map((cat) => (
                    <Box
                      key={cat}
                      as="button"
                      onClick={() => setFilter(cat)}
                      px={4}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      bg={filter === cat ? "brand.500" : "whiteAlpha.100"}
                      color={filter === cat ? "white" : "whiteAlpha.600"}
                      transition="all 0.2s"
                      _hover={{ bg: filter === cat ? "brand.600" : "whiteAlpha.200" }}
                    >
                      {cat}
                    </Box>
                  ))}
                </HStack>
              </VStack>

              {!loading && (
                <Flex align="center" gap={2}>
                  <Box w={2} h={2} borderRadius="full" bg="green.400" className="animate-pulse" />
                  <Text fontSize="xs" color="green.400" fontWeight="bold">LIVE SYNC</Text>
                </Flex>
              )}
            </Flex>

            {loading ? (
              <Flex h="300px" direction="column" align="center" justify="center" gap={4}>
                <Spinner color="brand.500" size="xl" thickness="4px" />
                <Text color="whiteAlpha.500" fontSize="lg" fontWeight="medium">Establishing Neural Link to Aiven MySQL...</Text>
              </Flex>
            ) : filteredLogs.length > 0 ? (
              <LogStream logs={filteredLogs} />
            ) : (
              <Flex h="300px" align="center" justify="center">
                <Text color="whiteAlpha.300" fontSize="lg">No logs found for "{filter}"</Text>
              </Flex>
            )}
          </MotionBox>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
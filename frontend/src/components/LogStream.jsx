import React from 'react';
import { Box, Badge, Text, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionHStack = motion.create(HStack);

export default function LogStream({ logs }) {
  return (
    <VStack spacing={4} align="stretch">
      {logs.map((log, index) => (
        <MotionHStack
          key={log.id || index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          p={4}
          bg="whiteAlpha.50"
          borderRadius="lg"
          borderLeft="4px solid"
          borderColor={log.urgency === 'high' ? "red.400" : "blue.400"}
        >
          <VStack align="start" flex={1} spacing={0}>
            <Text fontWeight="bold" fontSize="sm" color="white">
              {log.emailFrom}
            </Text>
            <Text noOfLines={1} fontSize="xs" color="whiteAlpha.600">
              {log.subject}
            </Text>
          </VStack>
          <Badge colorScheme={log.category === 'REFUNDS' ? 'red' : 'purple'} variant="subtle">
            {log.category}
          </Badge>
        </MotionHStack>
      ))}
    </VStack>
  );
}
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";

interface Props {
  prompt: string;
  defaultValue: string;

  // TextInput's props
  placeholder?: string;
  onSubmit: (userInput: string) => void;
  mask?: string;
  showCursor?: boolean;
  highlightPastedText?: boolean;
}

export const Input: React.FC<Props> = ({ prompt, defaultValue, onSubmit, ...textInputProps }) => {
  const [input, setInput] = useState("");

  return (
    <Box flexDirection="row">
      <Text>
        {prompt} {defaultValue ? `(default: ${defaultValue})` : ""}{" "}
      </Text>
      <TextInput
        value={input}
        onChange={setInput}
        onSubmit={(val) => onSubmit(val || defaultValue)}
        {...textInputProps}
      />
    </Box>
  );
};

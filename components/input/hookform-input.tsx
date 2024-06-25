import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
  get,
} from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

function HookformTextInput<TFieldValues extends FieldValues>({
  name,
  hookForm,
  ...props
}: TextInputProps & {
  style?: StyleProp<TextStyle>;
//   isPasswordInput?: boolean;
//   containerStyle?: StyleProp<ViewStyle>;
  name: FieldPath<TFieldValues>;
  hookForm: UseFormReturn<TFieldValues>;
}) {
  const {
    control,
    formState: { errors },
  } = hookForm;

  const errorMessgae = get(errors, name)?.message || "";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onBlur, onChange } }) => (
        <View className="w-[100%]">
          <TextInput
            {...props}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
          {errorMessgae && <Text className="text-red-500">{errorMessgae}</Text>}
        </View>
      )}
    />
  );
}

export default HookformTextInput;

const styles = StyleSheet.create({});

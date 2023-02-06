exports.getInputValues = (interaction, ...inputs) => {
  return inputs.map((input) =>
    interaction.fields.getTextInputValue(input.data.custom_id)
  );
};

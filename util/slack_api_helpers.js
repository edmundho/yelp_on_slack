const form = JSON.stringify({
  title: 'Create a Poll',
  callback_id: 'submit-form',
  submit_label: 'Submit',
  elements: [
    {
      label: 'Search Term',
      name: "search",
      type: 'text',
      placeholder: 'e.g. Japanese tapas'
    },
    {
      label: 'Price',
      type: 'select',
      name: 'price',
      options: [
        { label: "$", value: 1 },
        { label: "$$", value: 2 },
        { label: "$$$", value: 3 },
        { label: '$$$$', value: 4 }
      ]
    },
    {
      label: 'Distance',
      type: 'select',
      name: 'distance',
      options: [
        { label: "0.5mi", value: 0.5 },
        { label: "1.0mi", value: 1.0 },
        { label: "1.5mi", value: 1.5 },
        { label: "2.0mi", value: 2.0 }
      ]
    },
    {
      label: 'Location',
      name: "location",
      type: 'text',
      placeholder: 'Starting Location'
    }
  ]
});

module.exports = {
  form
};
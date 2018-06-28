const form = JSON.stringify({
  title: 'Create a Poll',
  callback_id: 'submit-form',
  submit_label: 'Submit',
  elements: [
    {
      label: 'Search Term',
      name: "search",
      type: 'text',
      placeholder: 'e.g. Japanese tapas',
      optional: "true"
    },
    {
      label: 'Price',
      type: 'select',
      name: 'price',
      options: [
        { label: "$", value: 1 },
        { label: "$$", value: 2 },
        { label: "$$$", value: 3 },
        { label: '$$$$', value: 4 },
        { label: 'Any Price', value: 0 }
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
        { label: "2.0mi", value: 2.0 },
        { label: "Any Distance", value: 0 }

      ]
    },
    {
      label: 'Location',
      name: "location",
      type: 'text',
      placeholder: 'e.g. 825 Battery St, San Francisco',
    }
  ]
});

module.exports = {
  form
};
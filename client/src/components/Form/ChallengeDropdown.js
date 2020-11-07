import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

export function ChallengeOptions(props) {

  // pull in props from UserSettings getUserSettings API call and set each challCat initially equal to correct prop

  const [challCat1, setChallCat1] = useState(props.choice1);
  const [challCat2, setChallCat2] = useState(props.choice2);
  const [challCat3, setChallCat3] = useState(props.choice3);

  const handleChange = (event, data) => {
    event.preventDefault()
    switch (data.name) {
      case "cat1":
        setChallCat1(data.value);
        console.log(data.value)
        break;
      case "cat2":
        setChallCat2(data.value);
        console.log(data.value)
        break;
      case "cat3":
        setChallCat3(data.value);
        console.log(data.value)
        break;
      default:
        return
    }
  }

  const handleSubmit = () => {
    const challengeCategories = {
      choice1: challCat1,
      choice2: challCat2,
      choice3: challCat3
    }
    console.log(challengeCategories)
    // make API call to update user challenge categories
  }

  const options1 = [
    { key: '1', text: 'Placeholder 1', value: 'Placeholder 1' },
    { key: '2', text: 'Placeholder 2', value: 'Placeholder 2' },
    { key: '3', text: 'Placeholder 3', value: 'Placeholder 3' }
  ]

  const options2 = [
    { key: '0', text: 'I choose nothing', value: 'I choose nothing' },
    { key: '1', text: 'Placeholder 1', value: 'Placeholder 1' },
    { key: '2', text: 'Placeholder 2', value: 'Placeholder 2' },
    { key: '3', text: 'Placeholder 3', value: 'Placeholder 3' }
  ]

  const options3 = [
    { key: '0', text: 'I choose nothing', value: 'I choose nothing' },
    { key: '1', text: 'Placeholder 1', value: 'Placeholder 1' },
    { key: '2', text: 'Placeholder 2', value: 'Placeholder 2' },
    { key: '3', text: 'Placeholder 3', value: 'Placeholder 3' }
  ]

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Select
          required
          fluid
          label='Challenge Category 1'
          options={options1}
          name="cat1"
          placeholder='Choose Category'
          onChange={handleChange}
        />
        <Form.Select
          fluid
          label='Challenge Category 2'
          options={options2}
          name="cat2"
          placeholder='Choose Category'
          onChange={handleChange}
        />
        <Form.Select
          fluid
          label='Challenge Category 3'
          options={options3}
          name="cat3"
          placeholder='Choose Category'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}
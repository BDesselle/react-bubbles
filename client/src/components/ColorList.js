import React from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import {
  Form,
  Button,
  Header,
  Card,
  Icon,
  Divider,
  Segment
} from "semantic-ui-react";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = React.useState(false);
  const [colorToEdit, setColorToEdit] = React.useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => {
            if (colorToEdit.id === color.id) {
              return colorToEdit;
            }
            return color;
          })
        );
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(res => updateColors(colors.filter(c => c.id !== color.id)))
      .catch(err => console.log(err));
  };

  return (
    <Segment.Group raised padded floated="left" className="aside">
      <Segment raised padded className="heading">
        <Header as="h1" dividing>
          <Header.Content>Colors</Header.Content>
        </Header>
        {editing && (
          <Segment>
            <Header as="h3">
              <Header.Content>Editing Color</Header.Content>
            </Header>
            <Form onSubmit={saveEdit}>
              <Form.Field>
                <label>Color Name</label>
                <input
                  onChange={e =>
                    setColorToEdit({ ...colorToEdit, color: e.target.value })
                  }
                  placeholder={colorToEdit.color}
                />
              </Form.Field>
              <Form.Field>
                <label>Hex Code</label>
                <input
                  onChange={e =>
                    setColorToEdit({
                      ...colorToEdit,
                      code: { hex: e.target.value }
                    })
                  }
                  placeholder={colorToEdit.code.hex}
                />
              </Form.Field>
              <Button compact icon circular color="red" floated="left">
                <Icon
                  color="white"
                  onClick={() => setEditing(false)}
                  name="cancel"
                />
              </Button>
              <Button
                type="submit"
                compact
                icon
                circular
                color="green"
                floated="right"
              >
                <Icon color="white" name="save" />
              </Button>
            </Form>
          </Segment>
        )}
      </Segment>
      <Segment raised padded className="colors-wrap">
        {colors.map(color => (
          <>
            <Card
              fluid
              style={{ backgroundColor: color.code.hex }}
              key={color.color}
            >
              <Card.Content>
                <Button compact icon circular color="yellow" floated="left">
                  <Icon
                    color="white"
                    onClick={() => editColor(color)}
                    name="edit"
                  />
                </Button>
                <Button compact icon circular color="red" floated="right">
                  <Icon
                    color="white"
                    onClick={() => deleteColor(color)}
                    name="delete"
                  />
                </Button>
                <Divider hidden />
                <Card.Header>{color.color}</Card.Header>
                <Card.Meta>{color.code.hex}</Card.Meta>
              </Card.Content>
            </Card>
          </>
        ))}
      </Segment>
    </Segment.Group>
  );
};

export default ColorList;

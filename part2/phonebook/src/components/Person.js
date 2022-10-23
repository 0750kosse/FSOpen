import { Button } from "./Button";

export const Person = ({ id, name, number, title, onClick }) => {
  return (
    <div id={id} className="contact">
      <p className="contact-name">
        {name} : {number}
      </p>
      <Button className="contact-button" title={title} onClick={onClick} />
    </div>
  );
};

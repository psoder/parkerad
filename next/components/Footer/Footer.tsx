import { colors } from "theme/Styles";

const Footer = () => {
  return (
    <footer>
      <p>This is a footer</p>

      <style jsx>{`
        footer {
          display: flex;
          flex: 1;
          padding: 2rem 0;
          justify-content: center;
          align-items: center;

          background-color: ${colors.secondary};
        }
      `}</style>
    </footer>
  );
};

export default Footer;

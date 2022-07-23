import AccessDenied from "components/AccessDenied";
import FullscreenModal from "components/Modals/FullscreenModal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { colors, stdPx } from "theme/Styles";

const AddLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const { status } = useSession();

  const handleClick = (e: any) => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>
          <h2>Add Location</h2>
        </button>
        <style jsx>{`
          h2 {
            margin: 0;
          }
          div {
            display: flex;
          }
        `}</style>
      </div>

      {showModal && (
        <FullscreenModal
          closeModal={() => {
            setShowModal(false);
          }}
          style={{ backgroundColor: colors.secondary, color: colors.text }}
        >
          {status !== "authenticated" ? (
            <AccessDenied toMessage="add a location" />
          ) : (
            <Input />
          )}
        </FullscreenModal>
      )}
    </>
  );
};

const Input = () => {
  const [state, setState] = useState<{
    locationName: string;
    longitude: number;
    latitude: number;
    description?: string;
    image?: string;
  }>({
    locationName: "",
    longitude: 0,
    latitude: 0,
  });
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    let allow = true;
    if (state.locationName == "") {
      allow = false;
    }

    if (state.longitude < -180 || state.longitude > 180) {
      allow = false;
    }

    if (state.latitude < -180 || state.latitude > 180) {
      allow = false;
    }

    setAllowSubmit(allow);
  }, [state.locationName, state.latitude, state.longitude]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event?.preventDefault();

    fetch("/api/locations/create", {
      method: "POST",
      body: JSON.stringify(state),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="root">
      <h1>Add Location</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name*
          <input
            name="locationName"
            value={state.locationName}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Longitude*
          <input
            type="number"
            value={state.longitude}
            name="longitude"
            placeholder="Longitude"
            onChange={handleChange}
          />
        </label>
        <label>
          Latitude*
          <input
            type="number"
            value={state.latitude}
            name="latitude"
            placeholder="Latitude"
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={state.description || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <input
            name="image"
            type="file"
            accept="image/*"
            value={state.image || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Add Location" disabled={!allowSubmit} />
      </form>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          font-size: 3rem;
          justify-self: start;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default AddLocation;

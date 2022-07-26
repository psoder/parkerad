import AccessDenied from "components/AccessDenied";
import FullscreenModal from "components/Modals/FullscreenModal";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
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
    image?: File;
  }>({
    locationName: "",
    longitude: 0,
    latitude: 0,
    image: undefined,
  });
  const [allowSubmit, setAllowSubmit] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    const allow = () => {
      if (state.locationName == "") {
        return false;
      }

      if (state.longitude < -180 || state.longitude > 180) {
        return false;
      }

      if (state.latitude < -180 || state.latitude > 180) {
        return false;
      }

      return true;
    };

    setAllowSubmit(allow());
  }, [state.locationName, state.latitude, state.longitude]);

  const handleChange = (event: any) => {
    if (event.target.name === "image") {
      setState({
        ...state,
        image: event.target.files[0],
      });
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleClearImage = () => {
    setState({ ...state, image: undefined });
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();

    let imageKey = "";

    if (state.image) {
      // Get signed upload URL
      const res = await fetch("/api/uploadFile", {
        method: "POST",
        body: JSON.stringify({
          type: state.image?.type,
        }),
      });

      if (res.status >= 300) {
        return;
      } else {
        const { url, key } = await res.json();
        imageKey = key;

        // Rename image to id
        let image = new File([state.image], key);

        // Upload image
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": image.type,
            "Access-Control-Allow-Origin": "*",
          },
          body: image,
        });
      }
    }

    // Create location
    const { location } = await fetch("/api/locations/create", {
      method: "POST",
      body: JSON.stringify({
        ...state,
        image: imageKey,
      }),
    }).then((res) => {
      return res.json();
    });

    window.location.reload();
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
            ref={fileInput}
            accept="image/*"
            // value={fileInput.current?.files[0].name || ""}
            onChange={handleChange}
          />
          <input type="button" value="Clear" onClick={handleClearImage} />
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

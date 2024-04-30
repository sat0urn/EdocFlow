import {useState, useEffect, useContext} from "react"
import { fetchDocuments } from "../http/docsApi";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../context/index.js";

const ProfileHistory = observer(() => {
  const {user} = useContext(AuthContext)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetchDocuments()
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents', error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="card m-5 p-4">
      <div className="row my-4">
        <div className="col-4">
          <h1 style={
            {
              color: '#407BFF',
            }
          }>
            Your documents
          </h1>
          <p className="text-secondary">
            Select one or more that you want to review
          </p>
        </div>
        <div className="col-8 mt-auto">
          <div className="input-group mb-3 w-25">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="&#xF002;   Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              style={
                {
                  fontFamily: 'Arial, FontAwesome'
                }
              }
            />
          </div>
        </div>
      </div>
      <div className="card">
        <table className="table table-borderless m-4 w-auto">
          <thead>
            <tr>
              <th
                scope="col"
                style={
                  {
                    color: '#407BFF',
                  }
                }
              >
                Name
              </th>
              <th
                scope="col"
                style={
                  {
                    color: '#407BFF',
                  }
                }
              >
                Date
              </th>
              <th
                scope="col"
                style={
                  {
                    color: '#407BFF',
                  }
                }
              >
                Responsible
              </th>
              <th
                scope="col"
                style={
                  {
                    color: '#407BFF',
                  }
                }
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => {
              return (
                <tr key={index}>
                  <th className="text-secondary" scope="row">
                    {doc.name}
                  </th>
                  <td className="text-secondary">
                    {new Date().toDateString()}
                  </td>
                  <td className="text-secondary">
                    {user.user.firstName} {user.user.lastName}
                  </td>
                  <td className="text-secondary">
                    Waiiting for signing
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export default ProfileHistory
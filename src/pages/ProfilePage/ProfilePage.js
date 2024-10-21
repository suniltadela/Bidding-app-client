import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuctions } from '../../redux/slices/auctionSlice';
import { createAuction, deleteAuction, fetchUserAuctions, updateAuction } from '../../services/auctionService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ProfilePage.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [userAuctions, setUserAuctions] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedAuction, setEditedAuction] = useState({ title: '', description: '', startingBid: '', endDate: new Date() });
  const [newAuction, setNewAuction] = useState({ title: '', description: '', startingBid: '', endDate: new Date() });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUserAuctions = async () => {
      if (user && user.id) {
        try {
          const fetchedUserAuctions = await fetchUserAuctions(user.id);
          setUserAuctions(fetchedUserAuctions);
          dispatch(setAuctions(fetchedUserAuctions));
        } catch (error) {
          console.error('Error fetching user auctions:', error);
        }
      }
    };

    getUserAuctions();
  }, [user, dispatch]);

  const handleEditClick = (auction) => {
    setEditMode(auction._id);
    setEditedAuction({ title: auction.title, description: auction.description, startingBid: auction.startingBid, endDate: new Date(auction.endDate) });
  };

  const handleSaveClick = async (id) => {
    try {
      await updateAuction(id, { ...editedAuction, endDate: editedAuction.endDate.toISOString() });
      const updatedAuctions = userAuctions.map((auction) => (auction._id === id ? { ...auction, ...editedAuction } : auction));
      setUserAuctions(updatedAuctions);
      dispatch(setAuctions(updatedAuctions));
      setEditMode(null);
    } catch (error) {
      console.error('Error updating auction:', error);
    }
  };

  const handleCreateAuction = async () => {
    try {
      await createAuction({ ...newAuction, userId: user.id, endDate: newAuction.endDate.toISOString() });
      const fetchedUserAuctions = await fetchUserAuctions(user.id);
      setUserAuctions(fetchedUserAuctions);
      dispatch(setAuctions(fetchedUserAuctions));
      setNewAuction({ title: '', description: '', startingBid: '', endDate: new Date() });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteAuction(id);
      const updatedAuctions = userAuctions.filter((auction) => auction._id !== id);
      setUserAuctions(updatedAuctions);
      dispatch(setAuctions(updatedAuctions));
    } catch (error) {
      console.error('Error deleting auction:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.firstname}!</h2>
      <p>Email: {user?.email}</p>

      <h3>Your Auctions</h3>
      <button onClick={openModal} className="create-auction-btn">Create New Auction</button>
      {userAuctions.length > 0 ? (
        <ul className="auction-list">
          {userAuctions.map((auction) => (
            <li key={auction._id} className="auction-item">
              {editMode === auction._id ? (
                <div className="auction-edit">
                  <input type="text" value={editedAuction.title} onChange={(e) => setEditedAuction({ ...editedAuction, title: e.target.value })} />
                  <textarea value={editedAuction.description} onChange={(e) => setEditedAuction({ ...editedAuction, description: e.target.value })} />
                  <input type="number" value={editedAuction.startingBid} onChange={(e) => setEditedAuction({ ...editedAuction, startingBid: e.target.value })} />
                  <DatePicker selected={editedAuction.endDate} onChange={(date) => setEditedAuction({ ...editedAuction, endDate: date })} />
                  <button onClick={() => handleSaveClick(auction._id)}>Save</button>
                  <FaTrash onClick={() => handleDeleteClick(auction._id)} className="icon" />
                </div>
              ) : (
                <div>
                  <strong>{auction.title}</strong>: {auction.description} (Starting Bid: ${auction.startingBid})
                  <FaEdit onClick={() => handleEditClick(auction)} className="icon" />
                  <FaTrash onClick={() => handleDeleteClick(auction._id)} className="icon" />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no auctions listed.</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Create New Auction</h3>
            <input type="text" placeholder="Title" value={newAuction.title} onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })} />
            <textarea placeholder="Description" value={newAuction.description} onChange={(e) => setNewAuction({ ...newAuction, description: e.target.value })} />
            <input type="number" placeholder="Starting Bid" value={newAuction.startingBid} onChange={(e) => setNewAuction({ ...newAuction, startingBid: e.target.value })} />
            <DatePicker selected={newAuction.endDate} onChange={(date) => setNewAuction({ ...newAuction, endDate: date })} />
            <button onClick={handleCreateAuction}>Create Auction</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

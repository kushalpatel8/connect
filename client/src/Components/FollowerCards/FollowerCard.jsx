import React, { useEffect, useState } from 'react';
import UserFollow from '../UserFollow/UserFollow';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="w-full glass-card rounded-2xl flex flex-col gap-4 text-[15px] p-5 transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.08)]">
      <h3 className="font-bold text-lg text-white">People you may know...</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <UserFollow person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
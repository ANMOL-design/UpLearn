import "./getIconsStyle.css"
// import { HeartFill, Heart, StarFill, Star } from "react-bootstrap-icons"
import {FiHeart} from "react-icons/fi";
import {FaHeart} from "react-icons/fa";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";


export const getLifeIcons = (life:number) => {
 
  if (life === 3) {
    return (
      <div className="hearts-wrap">
        <FaHeart className="heart-icon"/>
        <FaHeart className="heart-icon"/>
        <FaHeart className="heart-icon"/>
      </div>
    )
  }
  
  if (life === 2) {
    return (
      <div className="hearts-wrap">
        <FaHeart className="heart-icon"/>
        <FaHeart className="heart-icon"/>
        <FiHeart className="heart-icon"/>
      </div>
    )
  }
  
  if (life === 1) {
    return (
      <div className="hearts-wrap">
        <FaHeart className="heart-icon"/>
        <FiHeart className="heart-icon"/>
        <FiHeart className="heart-icon"/>
      </div>
    )
  }

  return (
    <div className="hearts-wrap">
      <FiHeart className="heart-icon"/>
      <FiHeart className="heart-icon"/>
      <FiHeart className="heart-icon"/>
    </div>
  )
}

export const getStarsIcons = (assertPercetage:number) => {
 
  if (assertPercetage > 89) {
    return (
      <div className="stars-wrap">
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
      </div>
    )
  }
  
  if (assertPercetage > 69) {
    return (
      <div className="stars-wrap">
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
      </div>
    )
  }
  
  if (assertPercetage > 49) {
    return (
      <div className="stars-wrap">
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
      </div>
    )
  }
  
  if (assertPercetage > 29) {
    return (
      <div className="stars-wrap">
        <AiFillStar className="star-icon"/>
        <AiFillStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
      </div>
    )
  }
  
  if (assertPercetage > 1) {
    return (
      <div className="stars-wrap">
        <AiFillStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
        <AiOutlineStar className="star-icon"/>
      </div>
    )
  }

  return (
    <div className="stars-wrap">
      <AiOutlineStar className="star-icon"/>
      <AiOutlineStar className="star-icon"/>
      <AiOutlineStar className="star-icon"/>
      <AiOutlineStar className="star-icon"/>
      <AiOutlineStar className="star-icon"/>
    </div>
  )
}

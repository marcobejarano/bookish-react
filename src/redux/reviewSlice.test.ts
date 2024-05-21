import { describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import reviewSliceReducer, { updateReview } from './reviewSlice';
import axios from "axios";

describe('reviewSlice', () => {
  it('updates a review', async () => {
    const mockStore = configureStore({
      reducer: {
        reviewSliceReducer,
      },
    });

    const review = {
      id: 1,
      content: 'Good work',
    };

    const putSpy = vi.spyOn(axios, 'put').mockResolvedValue({ data: review });

    await mockStore
      .dispatch(
        updateReview({
          bookId: 1,
          reviewId: 1,
          content: 'Good work',
        })
      )
      .then((response) => {
        expect(response.payload).toEqual(review);
      });

    expect(putSpy).toHaveBeenCalledWith(
      'http://localhost:8080/books/1/reviews/1',
      {
        content: 'Good work',
      }
    );
  });

  it('handles network error', async () => {
    const mockStore = configureStore({
      reducer: {
        reviewSliceReducer,
      },
    });

    const error = new Error('Network error');
    const putSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce(error);

    await mockStore
      .dispatch(
        updateReview({
          bookId: 1,
          reviewId: 1,
          content: 'Good work',
        })
      )
      .then((response) => {
        expect(response.type).toEqual('reviews/updateReview/rejected');
      });

    expect(putSpy).toHaveBeenCalledWith(
      'http://localhost:8080/books/1/reviews/1',
      {
        content: 'Good work',
      }
    );
  });
});

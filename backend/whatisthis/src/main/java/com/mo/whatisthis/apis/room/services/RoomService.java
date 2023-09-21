package com.mo.whatisthis.apis.room.services;

import com.mo.whatisthis.apis.room.entities.RoomEntity;
import com.mo.whatisthis.apis.room.repositories.RoomRepository;
import com.mo.whatisthis.apis.room.responses.RoomResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<RoomResponse> getRooms() {
        List<RoomResponse> roomResponses = new ArrayList<>();

        for (RoomEntity room : roomRepository.findAll()) {
            RoomResponse roomResponse = new RoomResponse();
            roomResponse.of(room);

            roomResponses.add(roomResponse);
        }

        return roomResponses;
    }

}

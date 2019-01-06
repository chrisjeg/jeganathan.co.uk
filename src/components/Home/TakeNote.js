import React from 'react';
import './TakeNote.scss';
import { Flex } from '../Layout';

export default ()=>(
        <Flex column className="take-note">
            <Flex center>
                <div className="animated_box drop-transition">
                    <div id="animated_note">
                        <div className="stavesection">
                            <div className="staves">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="sidestem">
                                <div className="box stem front"></div>
                                <div className="box stem left"></div>
                                <div className="box stem right"></div>
                                <div className="box stem back"></div>
                            </div>
                            <div className="sides">
                                <div className="box note_body front"></div>
                                <div className="box note_body left"></div>
                                <div className="box note_body right"></div>
                                <div className="box note_body top"></div>
                                <div className="box note_body bottom"></div>
                                <div className="box note_body back"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Flex>
        </Flex>
)
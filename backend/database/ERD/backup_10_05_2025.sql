PGDMP      .        
        }           smart_habit_tracker    17.4    17.4     7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            :           1262    16793    smart_habit_tracker    DATABASE     y   CREATE DATABASE smart_habit_tracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 #   DROP DATABASE smart_habit_tracker;
                     postgres    false            (          0    16796    activity 
   TABLE DATA           y   COPY habit_tracker.activity (activity_id, user_id, note_id, habit_tracker_detail_id, activity_date, mood_id) FROM stdin;
    habit_tracker               postgres    false    219   O       *          0    16805    habit 
   TABLE DATA           <   COPY habit_tracker.habit (habit_id, habit_name) FROM stdin;
    habit_tracker               postgres    false    221   �       ,          0    16812    habit_tracker 
   TABLE DATA           m   COPY habit_tracker.habit_tracker (habit_tracker_id, habit_id, duration, habit_tracker_detail_id) FROM stdin;
    habit_tracker               postgres    false    223   �       .          0    16819    mood 
   TABLE DATA           4   COPY habit_tracker.mood (mood_id, mood) FROM stdin;
    habit_tracker               postgres    false    225   �       0          0    16826    note 
   TABLE DATA           C   COPY habit_tracker.note (note_id, answer, question_id) FROM stdin;
    habit_tracker               postgres    false    227          2          0    16833    question 
   TABLE DATA           @   COPY habit_tracker.question (question_id, question) FROM stdin;
    habit_tracker               postgres    false    229   �       4          0    16840    user 
   TABLE DATA           h   COPY habit_tracker."user" (user_id, first_name, last_name, email, password_hash, date_join) FROM stdin;
    habit_tracker               postgres    false    231   �       B           0    0    activity_activity_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('habit_tracker.activity_activity_id_seq', 6, true);
          habit_tracker               postgres    false    218            C           0    0    habit_habit_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('habit_tracker.habit_habit_id_seq', 1, false);
          habit_tracker               postgres    false    220            D           0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('habit_tracker.habit_tracker_habit_tracker_id_seq', 1, false);
          habit_tracker               postgres    false    222            E           0    0    mood_mood_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.mood_mood_id_seq', 1, false);
          habit_tracker               postgres    false    224            F           0    0    note_note_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.note_note_id_seq', 25, true);
          habit_tracker               postgres    false    226            G           0    0    question_question_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.question_question_id_seq', 58, true);
          habit_tracker               postgres    false    228            H           0    0    user_user_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('habit_tracker.user_user_id_seq', 1, true);
          habit_tracker               postgres    false    230            (   M   x�U���0�7�%!�v�N��������'�bڴ��k�Q�s,gB����B�賚+!�w�-/zds���}G_�\ >�NQ      *      x������ � �      ,      x������ � �      .      x������ � �      0   �   x�Eϱn�@��~�{ T�v.��H�.]���%��r���w�{ՁJ7�����L���['�ȅRX�¦0��[�� �H�c<����5H��(Rm��IN�$��5�H��΄R��«u-�-��Z�2-�|��h�^����O7�E���q��k�\t���>���[?D�y�e'�1�w���u��y�H��	� �N�      2   �  x��V;��8�[����O�H�*�	6�"AI� P*m�Cl���I�5j��	��T�k����n$����Z酴J��*%L-����l�ծU��uf����nR�I)���1~��h�z���q�Q��;h�>�S�"��J�D//8^�J���TW#Dޔ�7/�[?#�Ь�R#���-m㱮ĝp4�K����i�������-=gz�Ӱ�I�z�p7j��͞��=93$��܏����ġ!Փh�U��,/�a�j�b�J�kܾ���#/��MJ�V������L]��3�FT�76�(q�[�̒���O�;��stF�"�쑛���r��g�����@��yQj����/_�����܄�Gc�&i�N��U����"��l?����?�w�@�L�	�A��t�7z+���.n�︧dڜ��%h��b-�����q�HBԁ�ê���X%=���=�+���e���$#S�R��ҥ�z�A��l&ϛ�p�e��K�8���Q�H�O��('$��8y�\��2�4_U�\_\]Ju8�6��]��!���x*��n��,Kӏ:��=b��n?�)[�ujh�Af����ҥPC�	Շ�*��Bu��<����)]���W$4#�@�#����Y�p5�UUoyc9���f���+e��Y�D43�Y����MFJ<K(Kf��*��y�%&�8�R��j���?��ښ&�J1C{�V��J�i6������9e�S�W�Z��p�Os��l�w�"J9�ZbN�-e�K��X�9�(�-���ꩫ5T�V�=e�5��t���(�^V*�q��i�D�������/w���
æS�3� �� z�<����v|�%¸B���)3��܊Ν)8�-0��	��8O)O���{RHɬ��g�g+��QwK���/����`D`��O:T
���Yvb���œ���g'zb'����m̶��u� �΍+�{(��r�z�yS]�0>t�Q��K�/'p�[�F0*f����J�!��<o<C�ueu�!��9�����U�e��{|�T�M�ˬ��j���s�	P��\�-džq�^�g�7���r>P�6�R����0?jX>|To����ZdTd��,�Sհ���>ozd���7ȩx־�Wc��s��rY<���-Jԃh�����!z[*��̫(����c�}GHPXV��sSxOяw3qQ̣�خ:n�~�l6��fwK      4   =   x�3���I�t�/�//�N���I442v(/�+���H,>ڔ�s����p��qqq �B�     